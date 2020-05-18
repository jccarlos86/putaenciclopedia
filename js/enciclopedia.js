$(document).ready(function(){
    $("#lnkBorrarFiltro").parent().hide();

    jQuery.expr[':'].Contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };
    $("#alerta").hide();
    obtenerRegistros();

    for(var p = 0; p < paises.length; p++){
        $("#pais").append("<option value='" + paises[p] + "'>" + paises[p] + "</option>");
    }
});

function guardar(txt, pais, desc, tipo){
    $.ajax({
        data: {
            tx: escape(txt),
            ps: escape(pais), 
            dsc: escape(desc),
            tp: escape(tipo)
        },
        url:   '../php/guardar.php',
        type:  'post',
        beforeSend: function () {
            console.log("guardando...");
        },
        success:  function (response) {
            console.log(response);
            if(response == "true"){
                alert("Texto guardado exitosamente");
            }else{
                alert("Error: " + response);
                //console.log("Error: " + response);
            }
        }
    });
}

function validar(){
    var txt = $("#texto").val();
    var tipo = $("#tipo").val();
    var desc = $("#descripcion").val();
    var pais = $("#pais").val();
    var valido = 0;
    var arrDatos = [txt, tipo, desc, pais];
    for(var a = 0; a < arrDatos.length; a++){
        if(arrDatos[a].length > 0){
            valido++;
        }
    }
    if(valido > 0){
        guardar(txt, pais, desc, tipo);
        obtenerRegistros();
        //buscar(txt, pais);
        $("#modalNuevoTexto").modal("hide");
    }else{
        alert("se deben llenar todos los campos");
    }
}

function obtenerRegistros(){
    $.ajax({
        data: {
        },
        url:   '../php/obtener.php',
        type:  'post',
        beforeSend: function () {
            console.log("buscando...");
        },
        success:  function (response) {
            if(response.startsWith("Connection")){
                //alerta("alert-danger", "Error: " + response);
                console.log("Error: " + response);
            }else{
                var data = JSON.parse(response);
                console.log(data);
                crearTabla(data);
            }
        }
    });
}

function crearTabla(data){
    var rows = "";
    for(var d = 0; d < data.length; d++){
        rows += "<tr><td class='text-center text-uppercase groseria'>"+unescape(data[d].Texto)+"</td>";
        rows += "<td class='text-center text-uppercase'>"+unescape(data[d].Tipo)+"</td>";
        rows += "<td class='text-justify' style='max-width:200px;'>"+unescape(data[d].Descripcion)+"</td>";
        rows += "<td class='text-center'>"+unescape(data[d].Pais)+"</td></tr>";
    }
    $("#tblContenido tbody").html(rows);
}

function alerta(cs, msg){
    $("#alerta").html(msg);
    $("#alerta").addClass(cs);
    $("#alerta").show();
    setTimeout(() => {
        $("#alerta").hide();
        $("#alerta").removeClass(cs);
    }, 5000);
}

function buscarTexto(texto){
    if(texto.length > 0){
        $("#tblContenido tbody tr").hide();
        $("#tblContenido tbody td:Contains('" + texto + "')").closest('tr').show();
    }else{
        $("#tblContenido tbody tr").show();
    }
}

function filtrarPorLetra(letra){
    $("#tblContenido tbody tr").hide();
    $(".groseria:Contains('" + letra + "')").each(function(e){
        if($(this).html().toLowerCase().startsWith(letra) || 
            $(this).html().toUpperCase().startsWith(letra)){
            $(this).closest('tr').show(); console.log($(this).html());
        }
    });
} 

//-----------------> TRIGGERS
$("#btnCrearTexto").click(function(){
    validar();
});

$("#lnkAgregar").click(function(evt){
    evt.preventDefault();
    $("#modalNuevoTexto").modal("show");
});

$("#buscador").keyup(function(){
    buscarTexto($(this).val());
});

$(".abc-dario").click(function(){
    $("#lnkBorrarFiltro").parent().show();
    filtrarPorLetra($(this).html());
});

$("#lnkBorrarFiltro").click(function(){
    buscarTexto("");
    $("#lnkBorrarFiltro").parent().hide();
});