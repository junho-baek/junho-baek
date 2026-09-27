"""Build the Korean portfolio from the same project data as the live terminal."""
import argparse
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--output', default=str(ROOT / 'output/pdf/백준호_AI_프로덕트_포트폴리오.pdf'))
parser.add_argument('--font-dir', default=str(Path.home() / 'Library/Fonts'))
args = parser.parse_args()
fonts = Path(args.font_dir)
pdfmetrics.registerFont(TTFont('Pretendard', str(fonts / 'Pretendard-Regular.ttf')))
pdfmetrics.registerFont(TTFont('PretendardBold', str(fonts / 'Pretendard-Bold.ttf')))
data = json.loads((ROOT / 'site/portfolio.json').read_text())
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
W, H = A4
M = 42
CW = W - 2*M
INK = '#172728'
MUTED = '#566965'
PAPER = '#F6F5EF'
GREEN = '#126A50'
MINT = '#BBF0D9'
LINE = '#D5DFD7'
BLUE = '#BAD8F3'
ORANGE = '#E6A67C'
c = canvas.Canvas(str(output), pagesize=A4, pageCompression=1)
c.setTitle('백준호 | AI-Native Product Builder | Selected Projects')
c.setAuthor('백준호 / Baek Junho')
c.setSubject('Junho Probe Plate, OwnCanvas, AgentCart, BYOKIYB')

def rect(x, top, width, height, color, radius=0):
    c.setFillColor(HexColor(color))
    if radius:
        c.roundRect(x, H-top-height, width, height, radius, fill=1, stroke=0)
    else:
        c.rect(x, H-top-height, width, height, fill=1, stroke=0)

def text(value, x, top, size=11, color=INK, bold=False):
    c.setFillColor(HexColor(color))
    c.setFont('PretendardBold' if bold else 'Pretendard', size)
    c.drawString(x, H-top-size, value)

def para(value, x, top, width, size=10.4, color=INK, bold=False, leading=None):
    style = ParagraphStyle('p', fontName='PretendardBold' if bold else 'Pretendard', fontSize=size,
                           leading=leading or size*1.5, textColor=HexColor(color), wordWrap='CJK')
    p = Paragraph(escape(value).replace('\n','<br/>'), style)
    _, height = p.wrap(width, 1000)
    p.drawOn(c,x,H-top-height)
    return height

def link(label, url, x, top, size=9, color=GREEN):
    text(label,x,top,size,color)
    c.linkURL(url,(x,H-top-size*1.4,x+pdfmetrics.stringWidth(label,'Pretendard',size),H-top+2),relative=0)

def footer(number, dark=False):
    color = '#829B93' if dark else MUTED
    text('BAEK JUNHO / SELECTED PROJECTS',M,H-34,8,color)
    text(f'{number:02d} / 06',W-M-36,H-34,8,color)

def base(number, category):
    rect(0,0,W,H,PAPER)
    text('BAEK JUNHO',M,27,9,GREEN,True)
    text(category,W-M-180,27,9,MUTED)
    rect(M,49,CW,1,LINE)
    footer(number)

# Cover: one clear story, four tangible projects.
rect(0,0,W,H,INK)
text('BAEK JUNHO / PORTFOLIO / 2026.09',M,36,10,MINT)
text('Intent into',M,99,49,'#F6F5EF',True)
text('working systems.',M,153,49,'#F6F5EF',True)
text('백준호',M,234,23,MINT,True)
text('AI-Native Product Builder',M,269,14,'#C6D6CE')
para('모호한 문제를 구현 가능한 흐름으로 바꾸고,\n구조·정책·검증으로 AI 결과를 책임집니다.',M,312,CW,15,'#E0E8E0',leading=23)
rect(M,390,CW,1,'#385149')
colors=[MINT,BLUE,ORANGE,'#D4C9F4']
for i,p in enumerate(data['projects']):
    x=M+(i%2)*(CW/2+7)
    top=420+(i//2)*112
    width=CW/2-7
    rect(x,top,width,96,'#223735',6)
    text(f'0{i+1} / {p["category"]}',x+15,top+13,8.5,colors[i])
    text(p['name'],x+15,top+32,18,'#F6F5EF',True)
    labels=['기술·의도·인지를 검증하는 하네스','내 키와 모델을 쓰는 생성 캔버스','추천 맥락을 전달하는 커머스 도구','모바일에서 로컬로 안전한 키 입력']
    para(labels[i],x+15,top+59,width-30,9.5,'#C6D6CE')
text('EXPERIENCE THAT SHAPED THE WORK',M,676,8.5,MINT)
para('COFATHON 올리브영 트랙 TOP 3 · 최종 2위\nSKT AI Fellowship 7기 · YBIGTA Data Engineering\n연세 GenAI 금상 · AI Workflow 최우수상 · LLM Query 대상',M,697,CW,10,'#D9E3DC',leading=17)
link('github.com/junho-baek','https://github.com/junho-baek',M,762,9.5,MINT)
link('junho6610@yonsei.ac.kr','mailto:junho6610@yonsei.ac.kr',M+242,762,9.5,MINT)
footer(1,True)
c.showPage()

# Four case studies, with concise architecture and commit-pinned evidence.
for i,p in enumerate(data['projects']):
    base(i+2,p['category'])
    text(f'0{i+1}',M,70,13,GREEN,True)
    text(p['name'],M,95,33,INK,True)
    para(p['tagline']['ko'],M,143,CW,16,GREEN,True)
    text('문제와 출발점',M,198,9,GREEN,True)
    para(p['problem']['ko'],M,218,CW,10.5)
    text('핵심 설계 판단',M,282,9,GREEN,True)
    para(p['decision']['ko'],M,302,CW,10.5)
    rect(M,366,CW,86,INK,6)
    for j,step in enumerate(p['flow']):
        x=M+14+j*(CW-16)/4
        text(f'0{j+1}',x,378,8,MINT)
        para(step,x,398,(CW-40)/4,10,'#F6F5EF',True,13)
        if j<3:text('>',x+(CW-16)/4-13,401,11,MINT)
    top=474
    for j,item in enumerate(p['detail']):
        text(f'{j+1:02d}',M,top,10,GREEN,True)
        text(item['title'],M+31,top-1,11,INK,True)
        height=para(item['body'],M+31,top+18,CW-31,9.7,MUTED,leading=14)
        top += max(62,height+30)
    # The boundary is a design decision and current delivery scope.
    scope_top=max(top+1,663)
    scope_height=para(p['boundary']['ko'],M+13,scope_top+24,CW-26,8.7,MUTED,leading=12.4)
    # Draw background behind text, then repaint paragraph.
    rect(M,scope_top,CW,scope_height+35,'#E7EEE5',4)
    text('현재 범위',M+13,scope_top+9,8.5,GREEN,True)
    para(p['boundary']['ko'],M+13,scope_top+24,CW-26,8.7,MUTED,leading=12.4)
    source_top=scope_top+scope_height+46
    link(f'github.com/junho-baek/{p["repo"]}',f'https://github.com/junho-baek/{p["repo"]}',M,source_top,8.2)
    text(f'Source review · {p["sha"][:7]}',M,source_top+15,7.7,MUTED)
    source_file=p['sources'][1]
    label=source_file if len(source_file)<72 else '…/'+ '/'.join(source_file.split('/')[-3:])
    link(label,f'https://github.com/junho-baek/{p["repo"]}/blob/{p["sha"]}/{source_file}',M,source_top+28,7.5)
    if source_top+40 > H-49:
        raise ValueError(f'Page overflow: {p["name"]} at {source_top}')
    c.showPage()

base(6,'OPERATING PRINCIPLES')
text('Build. Verify. Explain.',M,79,32,INK,True)
para('의도를 구현으로 옮기고,\n다음 수정까지 이어지는 근거를 남깁니다.',M,129,CW,17,GREEN,True)
principles=[
 ('01 / TECHNIQUE','실제 동작과 변경 경계를 확인합니다.','화면·도메인 규칙·외부 호출의 책임을 나누고, 타입과 테스트로 이어 붙입니다. 실패 지점을 식별할 수 있어야 다음 구현도 빨라집니다.'),
 ('02 / INTENT','사용자가 정한 목적을 추적합니다.','원문 질의와 해석, 완료 조건, 선택한 대안, 실패와 재검증을 기록합니다. AI가 채운 가정이 원래 의도로 바뀌지 않게 관리합니다.'),
 ('03 / COGNITION','만든 사람이 설명할 수 있어야 합니다.','왜 이 구조인지, 정상·비정상 경로가 어떻게 이어지는지 실제 코드로 설명합니다. 인지 퀴즈에서 드러난 빈틈은 다음 학습과 구조 개선으로 연결합니다.'),
]
for i,(label,title,body) in enumerate(principles):
    top=215+i*112
    text(label,M,top,9,GREEN,True)
    text(title,M,top+21,15,INK,True)
    para(body,M,top+49,CW,10.5,MUTED)
rect(M,566,CW,1,LINE)
text('검토 가능한 결과물',M,588,16,INK,True)
para('네 프로젝트의 공개 저장소와 해당 commit의 코드·문서를 연결했습니다. 구현 항목은 소스에서 확인한 범위이며, 테스트 파일과 현재 개발 범위도 함께 제시합니다.',M,620,CW,10.5,MUTED)
link('Live terminal / interactive case studies','https://junho-baek.github.io/junho-baek/',M,681,11)
link('github.com/junho-baek','https://github.com/junho-baek',M,711,11)
link('junho6610@yonsei.ac.kr','mailto:junho6610@yonsei.ac.kr',M,741,11)
text(f'공개 소스 검토 기준: {data["updated"]}',M,773,8,MUTED)
c.showPage()
c.save()
print(output)
