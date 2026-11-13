# Roteiro da narração — Voice Studio, voz **Diogo v2**

Português brasileiro, ritmo urgente mas claro (âncora de plantão). Alvo: **~60 s** (teto 65 s).
Não cortar frases nem improvisar palavras. Pausa curta (≈0,3 s) nos pontos finais; pausa um pouco maior entre os blocos.

## Texto (uma linha por bloco, para facilitar a sincronia)

1. Ontem, 12 de novembro, a Caixa Seguridade comunicou um ataque à Caixa Vida e Previdência. Dados de 7,6 milhões de clientes foram copiados para fora do ambiente tecnológico.
2. Vazaram nomes e CPFs e, em parte dos registros, endereço, telefone, e-mail e nascimento. Identificado no dia 6, só foi divulgado ontem. Não há indício de senha ou dado bancário comprometido.
3. No mesmo dia, o Pix e o app da Caixa passaram de mil reclamações às 13 horas, sem relação confirmada com o vazamento. O Outlook teve pico de mais de 7,8 mil reclamações; a Microsoft apontou falha de infraestrutura, não um ataque.
4. Outros incidentes não têm evidência de coordenação. Na sexta, dia 6, queda de energia e um ataque derrubaram os sistemas do Porto de Santos por mais de 96 horas. No dia 3, as UPAs de Cuiabá atenderam no papel após tentativa de ataque à prefeitura.
5. Em 2025, desviaram mais de 800 milhões de reais de contas-reserva no Banco Central com a senha de um funcionário da C&M, paga com 15 mil reais por motoboy.
6. Na prática: a Caixa não pede senha, código ou Pix por WhatsApp ou ligação. Golpistas devem usar esta notícia. Quem teve telefone ou e-mail na base deve receber o aviso oficial.

## Pronúncia (atenção a termos em inglês e siglas)

| Escrito | Como deve soar | Se o TTS errar, escreva no Voice Studio |
|---|---|---|
| Pix | "pics" em português, vogal curta, não "picks" alongado nem "paix" | `Pics` |
| app | "épi" (como se fala no Brasil), não "ápp" | `épi` |
| Outlook | "áut-luk", acento no início | `Áutluk` |
| Microsoft | "máicrossóft", pronúncia brasileira usual | `Máicrossóft` |
| WhatsApp | "uóts-épi" | `Uótsépi` |
| e-mail | "i-mêil" | `imeil` |
| C&M | "cê e eme" (letras soletradas em português) | `Cê e Eme` |
| CPFs | "cê-pê-éfes" | `cê pê éfes` |
| UPAs | "úpas" (palavra, não soletrado) | `úpas` |
| ANPD | não aparece na VO (só na tela) | — |
| 7,6 milhões | "sete vírgula seis milhões" | `sete vírgula seis milhões` |
| 7,8 mil | "sete vírgula oito mil" | `sete vírgula oito mil` |
| 13 horas | "treze horas" | `treze horas` |
| 12/11 | "doze de novembro" (já está por extenso no texto) | — |
| 96 horas | "noventa e seis horas" | — |
| 800 milhões de reais | "oitocentos milhões de reais" | — |
| 15 mil reais | "quinze mil reais" | — |
| motoboy | "mótobói", pronúncia brasileira | `mótobói` |

Dica: se alguma palavra sair errada, troque só ela pela grafia fonética da terceira coluna no campo de texto
do Voice Studio; o `.srt` e as legendas queimadas usam a grafia correta de `src/captions.json`, não o texto do TTS.

## Entrega
Salvar como `public/vo/diogo-v2.mp3` (ou `.wav`) e seguir `public/vo/README.md` para a sincronia.
