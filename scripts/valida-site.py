"""
Validador do site estatico.

O item que importa e o de ancoras ENTRE paginas: em 03/09/2026 renomeei
#processo para #como-funciona na home e tres paginas ficaram apontando para o
id antigo. Nao dava 404 — levava para o topo da home, calado. A verificacao
anterior so olhava ancoras dentro da propria pagina, entao nao tinha como pegar.
"""
import re, sys, pathlib, urllib.request, urllib.error

RAIZ = pathlib.Path('out')
BASE = 'http://127.0.0.1:8144'
falhas = []


def ok(cond, rotulo, detalhe=''):
    print(f"  [{'OK ' if cond else 'FALHA'}] {rotulo}{(' — ' + detalhe) if detalhe else ''}")
    if not cond:
        falhas.append(rotulo)


def rota_de(f):
    rel = f.parent.relative_to(RAIZ).as_posix()
    return '/' if rel == '.' else '/' + rel + '/'


paginas = {rota_de(f): f.read_text(encoding='utf-8') for f in RAIZ.rglob('index.html')}
ids = {r: set(re.findall(r'\sid="([^"]+)"', h)) for r, h in paginas.items()}

print(f"\n=== {len(paginas)} paginas publicadas ===")

print("\n1. Ancoras entre paginas (o defeito de hoje)")
quebradas = []
for rota, html in paginas.items():
    for href in re.findall(r'href="([^"]+)"', html):
        if href.startswith('#'):
            destino, frag = rota, href[1:]
        elif '#' in href and href.startswith('/'):
            caminho, frag = href.split('#', 1)
            destino = caminho if caminho.endswith('/') else caminho + '/'
        else:
            continue
        if destino not in ids:
            quebradas.append(f'{rota} -> {href} (pagina inexistente)')
        elif frag not in ids[destino]:
            quebradas.append(f'{rota} -> {href} (id ausente em {destino})')
ok(not quebradas, 'toda ancora tem destino real', '; '.join(quebradas) if quebradas else
   f'{sum(len(re.findall(chr(35), h)) for h in paginas.values())} fragmentos conferidos')

print("\n2. Links internos apontam para pagina existente")
mortos = []
for rota, html in paginas.items():
    for href in set(re.findall(r'href="(/[^"#]*)"', html)):
        alvo = RAIZ / href.lstrip('/')
        existe = alvo.exists() or (alvo / 'index.html').exists()
        if not existe:
            mortos.append(f'{rota} -> {href}')
ok(not mortos, 'nenhum link interno morto', '; '.join(mortos) if mortos else '')

print("\n3. Links externos: atributos e destino")
externos = {}
for rota, html in paginas.items():
    for tag in re.findall(r'<a\b[^>]*href="(https?://[^"]+)"[^>]*>', html):
        externos.setdefault(tag, []).append(rota)
sem_blank = []
for rota, html in paginas.items():
    for tag in re.findall(r'<a\b[^>]*>', html):
        if re.search(r'href="https?://', tag) and 'wa.me' not in tag:
            if 'target="_blank"' not in tag or 'noopener' not in tag:
                sem_blank.append(f'{rota}: {tag[:90]}')
ok(not sem_blank, 'todo link externo tem target=_blank e rel=noopener',
   '; '.join(sem_blank) if sem_blank else f'{len(externos)} destinos distintos')

for u in sorted(externos):
    if 'wa.me' in u:
        continue
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=25) as r:
            ok(r.status == 200, f'{u[:66]}', str(r.status))
    except Exception as e:
        ok(False, f'{u[:66]}', str(e)[:60])

print("\n4. Aviso de site externo, por escrito")
faltando = [u for rota, html in paginas.items() for u in [1]
            if 'consultas-oficiais' in rota and html.count('site externo') < html.count('target="_blank"')]
ok(not faltando, 'todo link externo da pagina diz que e externo')

print("\n5. Nenhuma dependencia externa em execucao")
BUSCA = {'stylesheet', 'icon', 'apple-touch-icon', 'manifest', 'preload', 'prefetch', 'preconnect'}
for rota, html in paginas.items():
    d = []
    for tag in re.findall(r'<link\b[^>]*>', html):
        rel = (re.search(r'rel="([^"]+)"', tag) or [None, ''])[1].lower().split()
        href = (re.search(r'href="([^"]+)"', tag) or [None, None])[1]
        if href and any(x in BUSCA for x in rel):
            d.append(href)
    d += re.findall(r'<[^>]+\ssrc="([^"]+)"', html)
    ext = [x for x in d if x.startswith(('http://', 'https://', '//'))]
    ok(not ext, f'{rota} sem dependencia externa', str(ext) if ext else '')

print("\n6. Sem JavaScript")
for rota, html in paginas.items():
    s = len(re.findall(r'<script(?![^>]*ld\+json)', html))
    ok(s == 0, f'{rota} sem <script> executavel', f'{s} encontrado(s)' if s else '')

print("\n7. Conteudo proibido nas paginas da marca nova")
pad = {'urgencia': r'\bvagas\b|restam apenas|tempo limitado', 'promessa': r'100%|garantid[oa]s?\b',
       'parceria': r'\bparceir|credenciad|nosso parceiro'}
for rota, html in paginas.items():
    if rota.startswith('/guias'):
        continue
    t = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', re.sub(r'(?s)<script.*?</script>', ' ', html)))
    achou = {k: sorted(set(re.findall(v, t, re.I))) for k, v in pad.items()}
    achou = {k: v for k, v in achou.items() if v}
    ok(not achou, f'{rota} sem conteudo proibido', str(achou) if achou else '')

print("\n8. Rotas respondem")
for rota in sorted(paginas):
    try:
        with urllib.request.urlopen(BASE + rota, timeout=10) as r:
            ok(r.status == 200, f'{rota}', str(r.status))
    except Exception as e:
        ok(False, f'{rota}', str(e)[:50])

print('\n' + ('TODAS PASSARAM' if not falhas else f'{len(falhas)} FALHA(S): {falhas}'))
sys.exit(1 if falhas else 0)
