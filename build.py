# Reconstruit l'application à partir des sources (src__*, tpl__*, img__*).
# Usage : python3 build.py   (depuis la racine du dépôt)
import json, base64, os, time
d = os.path.dirname(os.path.abspath(__file__))
img = {}
for f in sorted(os.listdir(d)):
    if f.startswith('img__') and f.endswith('.svg'):
        k = f[5:-4]; k = {'immobilier': 'immo'}.get(k, k)
        img[k] = 'data:image/svg+xml;base64,' + base64.b64encode(open(os.path.join(d, f), 'rb').read()).decode()
order = ['core', 'auth', 'social', 'opps', 'joyau', 'main']
js = '"use strict";\nconst IMG = ' + json.dumps(img) + ';\n' + '\n'.join(open(os.path.join(d, 'src__' + n + '.js'), encoding='utf-8').read() for n in order)
open(os.path.join(d, 'app.js'), 'w', encoding='utf-8').write(js)
open(os.path.join(d, 'app.css'), 'w', encoding='utf-8').write(open(os.path.join(d, 'src__app.css'), encoding='utf-8').read())
V = time.strftime('%Y%m%d%H%M')
for t in ['index.html', 'sw.js']:
    open(os.path.join(d, t), 'w', encoding='utf-8').write(open(os.path.join(d, 'tpl__' + t), encoding='utf-8').read().replace('__V__', V))
print('Build OK, version', V)
