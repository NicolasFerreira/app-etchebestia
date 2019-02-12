// import JsPDF from 'jspdf' // à vérifier

export default {
  // created () {
  //   let ckeditor1 = document.createElement('script')
  //   ckeditor1.setAttribute(
  //     'src',
  //     'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js'
  //   )
  //   document.body.appendChild(ckeditor1)
  //   let ckeditor2 = document.createElement('script')
  //   ckeditor2.setAttribute(
  //     'src',
  //     'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js'
  //   )
  //   document.body.appendChild(ckeditor2)
  // },
  methods: {
    print: function () {
      window.print()
    }
    // dlPDF: function (animal) {
    //   var pdf = new JsPDF('l', 'mm', 'a4')
    //   pdf.internal.scaleFactor = 2.5
    //   var options = {
    //     format: 'PNG'
    //   }

    //   // pdf.text('Liste des brebis', 10, 10)
    //   pdf.addHTML(
    //     document.getElementById('areaPDF'),
    //     20,
    //     20,
    //     options,
    //     function () {
    //       pdf.save('liste-' + animal + '.pdf')
    //     }
    //   )
    // }
  }
}
