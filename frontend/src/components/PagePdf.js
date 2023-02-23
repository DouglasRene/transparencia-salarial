export class Impressao {

  constructor(dadosParaImpressao, imgBse) {
    this.dadosParaImpressao = dadosParaImpressao
    this.imgBse = imgBse
  }


  GerarDocumento() {
    const nome = this.dadosParaImpressao.map((dado) => { return dado.NOME })
    const chapa = this.dadosParaImpressao.map((dado) => { return dado.CHAPA })
    const anoComp = this.dadosParaImpressao.map((dado) => { return dado.ANOCOMP })
    const mesComp = this.dadosParaImpressao.map((dado) => { return dado.MESCOMP })
    const salario = this.dadosParaImpressao.map((dado) => { return dado.VALORORIGINAL })
    const profissao = this.dadosParaImpressao.map((dado) => { return dado.NOME1 })
    const descricao = this.dadosParaImpressao.map((dado) => { return dado.DESCRICAO })
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 10, 14, 58],
      content: [
        {
          layout: 'noBorders',
          table: {
            widths: [100, '*'],
            heigths: [80],
            body: [
              [
                { image: this.imgBse, width: 80 },
                { text: 'SERCIÇO DE SAÚDE DR. CÂNDIDO FERREIRA', margin: [30, 30, 0, 0], bold: true },
              ],
            ],
          },
        },
        [
          {
            text:
              '_____________________________________________________________________________________________________________________________',
            alignment: 'center',
            bold: true,
            fontSize: 10,
            margin: [0, 0, 0, 20],
          },
        ],

        {
          table: {
            widths: [300, '*', '*'],
            body: [
              [
                {
                  fillColor: '#DDDDDD', text: 'Parâmetros selecionados', bold: true, fontSize: 12, alignment: 'center', colSpan: 3
                },
                '',
                ''
              ],
              [
                {
                  border: [true, true, false, true],
                  text: [
                    { text: 'Relatório: ', bold: true, fontSize: 10, alignment: 'center' },
                    { text: 'Salário Colaborador Individual', fontSize: 10, alignment: 'center' },
                  ]
                },
                {
                  border: [false, true, false, true],
                  text: [
                    { text: 'Ano: ', bold: true, fontSize: 10, alignment: 'center' },
                    { text: anoComp, fontSize: 10, alignment: 'center' }
                  ]
                },
                {
                  border: [false, true, true, true],
                  text: [
                    { text: 'Mês: ', bold: true, fontSize: 10, alignment: 'center' },
                    { text: mesComp, fontSize: 10, alignment: 'center' }
                  ]
                },
              ]
            ]
          }
        },
        {
          margin: [0, 30, 0, 0],
          table: {
            widths: [300, '*', '*'],
            body: [
              [
                { fillColor: '#CCCCCC', text: chapa + ' - ' + nome, fontSize: 12, bold: true, alignment: 'center', colSpan: 3 },
                '',
                ''
              ],
              [
                {
                  border: [true, true, true, false],
                  margin: [10, 5, 0, 5],
                  colSpan: 3,
                  text: [
                    { text: 'Setor: ', bold: true, fontSize: 10, alignment: 'center' },
                    { text: descricao, fontSize: 10, alignment: 'center' }
                  ]
                }
              ],
              [
                {
                  border: [true, false, true, false],
                  margin: [10, 5, 0, 5],
                  colSpan: 3,
                  text: [
                    { text: 'Cargo: ', bold: true, fontSize: 10, alignment: 'center' },
                    { text: profissao, fontSize: 10, alignment: 'center' }
                  ]
                }
              ],
              [
                {
                  border: [true, false, true, true],
                  margin: [10, 5, 0, 5],
                  colSpan: 3,
                  text: [
                    { text: 'Salário: ', bold: true, fontSize: 10, alignment: 'center' },
                    { text: salario, fontSize: 10, alignment: 'center' }
                  ]
                }
              ]
            ]
          }
        }
      ],
      footer(currentPage, pageCount) {
        const today = new Date();
        return {
          layout: 'noBorders',
          margin: [10, 10, 10, 10],
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                {
                  colSpan: 3,
                  text:
                    '____________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  bold: true,
                  fontSize: 9,
                  margin: [0, 0, 0, 10],
                },
                '',
                ''
              ],
              [
                {
                  text: `${today.toLocaleString("pt-br")}`,
                  fontSize: 10,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                },
                {
                  text: '© Candido Ferreira',
                  fontSize: 7,
                  alignment: 'center',
                },
                {
                  text: `Página ${currentPage.toString()} de ${pageCount}`,
                  fontSize: 10,
                  alignment: 'right',
                  /* horizontal, vertical */
                  margin: [0, 0, 0, 0],
                },
              ]
            ],
          },
        };
      },
    };
    return documento;
  }
}