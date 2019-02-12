<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  background: white;
  padding: 0;
  margin:0;
  overflow-x: hidden;
  width: 100vw;
  min-height: 100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:auto;
  background:white;
  width: 100vw;
  min-height: 100vh;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
#test {
  background: white;
}

.sub-menu {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 15px;
  width: 80vw;
  margin:auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
@media all and (min-width: 800px) {
  .sub-menu {
    width: 400px !important;
    border-radius: 4px !important;
  }
}

/* START css Liste */
table {
  width: 90vw;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin: auto;
  padding: 10px 0;
  border-collapse: collapse;
  margin-bottom:50px;
}
th {
  color:#999;
  font-size: 0.9rem;
  padding: 10px 0 ;
}

tr.table-item td {
  border-top:1px solid #999;
  font-weight: bold;
}

tr td a {
    display: block;
    padding: 15px 0;
    width: 100%;
}

.table-head th {

}

.table-item-numero {
  color:#2FC86D;
}

.table-head-icon {
  width: 20px;
  margin-bottom: -5px;
  cursor:pointer;
}

.top-lamb-search {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

input.search {
  width: 30vw;
  height: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border:none;
  border-radius: 15px;
  padding: 10px;
  margin-right: 20px;
}

@media all and (min-width: 800px) {
  table {
    width: 75vw;
    border-radius: 5px;
  }
  input.search {
    border-radius: 10px;
    width: 100px;
  }
}

/* FIN css Liste */

/* START fiche individuelle */
.fiche {
  width: 70vw;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 15px;
  margin: auto;
  padding: 30px;
  font-size: 0.8rem;

}

.fiche-item {
  display: flex;
  align-items: center;
}

.fiche-result {
  font-weight: bold;
}

.fiche label {
  text-align: left;
  color: #999;
  font-weight: bold;
  margin-right: 20px;
  white-space: nowrap;
}

.fiche-result-rounded {
  background: #2FC86D;
  padding:5px 15px;
  border-radius: 50px;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  color: white;
}

.fiche-date {
  font-weight: bold;
}

.fiche-date span {
  /* margin: 0 5px ; */
  border-top: 2px solid #2FC86D;
  border-bottom: 2px solid #2FC86D;
  padding: 5px;
}

.fiche .icon {
  width: 25px;
  position: absolute;
  right: 15vw;
}

@media all and (min-width: 800px) {
  .fiche {
  width: 300px;
  border-radius: 5px;
 }
  .fiche .icon {
    position: initial;
    margin:-30px;
    margin-left:200px;
  }
  .form-add {
    border-radius: 5px !important;
  }
}

/* END fiche individuelle */

/* START css form ajout */
.form-add {
  width: 70vw;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 15px;
  margin: auto;
  padding: 30px;
  font-size: 0.8rem;
}

.label-form {
 text-align: left;
 color: #999;
 font-weight: bold;
}

.div-num {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
}
.div-num label {
  width: 100%;
}
.div-num input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #999;
  padding: 5px;
  font-size: 1rem;

}

.radio {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  flex-direction: column;
}

.radio div {
  display: flex;
}

.radio input[type="radio"]{
  visibility: hidden;
  height: 0;
  width: 0;
}

.radio label {
  white-space: nowrap;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  background-color: none;
  padding: 5px 20px;
  border-radius: 20px;
  border:1px solid #2FC86D;
  color:#2FC86D;
  transition: 0.5s;
  font-weight: bold;
}
.radio input[type="radio"]:checked + label{
  background-color: #2FC86D;
  color: white;
  transition: 0.5s;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.parent {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.parent .div-num {
  width: 40%;
}

.date {
  margin:30px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.date label {
  text-align: center;
}

.date input {
  width: 60%;
  padding: 20px 5px;
  border: none;
  border-top: 2px solid #2fc86d;
  font-size: 0.9rem;
  border-bottom: 2px solid #2fc86d;
}

.cat-flex {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.cat-flex input[type="radio"] {
  margin-left: -5px;
}

.cat-flex input,.cat-flex label {
  margin-bottom: 10px;
}

.btn-submit {
  background:#2FC86D;
  color: white;
  padding: 15px 80px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border:none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  margin: 30px auto;
  cursor: pointer;
  transition:0.1s;
}

.btn-trash {
  position: absolute;
  right: 15vw;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.icon-trash {
  width: 25px;
}

.btn-reverse {
  border: 2px solid #2fc86d;
  background: white;
  color: #2fc86d;
}
.btn-div-bot {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-toggle {
 padding: 10px 15px;
 margin: 30px 0;
}

@media all and (min-width: 800px) { /* responsive page edit */
  .btn-div-bot {
    width: 400px;
    margin:auto;
  }
  .form-add {
    width: 400px;
  }
  .btn-trash {
    position:initial;
    margin-left:380px;
    margin-top:-5px;
  }

  .modal-box{
    width: 40vw!important;
    left:35vw!important;
  }

  .desktop-item {
    display: table-cell!important;
  }
}
.desktop-item {
    display: none;
}

.modal {
  width: 100vw;
  height: 100vh;
  top:0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
}

.modal-box {
  width: 70vw;
  height: 30vh;
  position: fixed;
  top:35vh;
  left:15vw;
  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-body {
  padding: 30px 20px;
  font-weight: bold;
}

.modal-bottom {
  display: flex;
  flex-direction: row;
}

.modal-bottom div{
  width: 50%;
  padding: 10px 0;
  border-top: 2px solid #2fc86d;
  color: #2fc86d;
  font-weight: bold;
  cursor: pointer;
}

.modal-del {
  background: #2fc86d;
  color: white!important;
  border-radius: 0 0 10px 0 ;
}

.display-none {
  display: none!important;
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}

.top-milk-card .icon {
  display: none!important;
}

.filter-desktop {
  display: none;
}

.print-title {
  display: none;
}

@media print {
    /* les styles d'impression commencent ici */
    header,nav,.btn-add ,.search ,.filter-desktop ,.top-lamb-search,.btn-dl,.btn-add {
      display: none!important;
    }
    .desktop-item {
      display: table-cell!important;
    }
    #areaPDF {
      position: absolute;
      left: 0;
      top: 60px;
      width: 100vw!important;
      background: white;
      font-size: 1rem;
      box-shadow: none!important;
      border-top: 1px solid #aaa;
      border-bottom: 1px solid #aaa;
    }
    .print-title {
      position: fixed;
      top:0;
      left:0;
      width:100vw;
      display: initial;
      text-align: center;
    }
}
@page {
        size: A4;
        margin: 0;
}
</style>
