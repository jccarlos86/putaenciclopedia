$(document).ready(function(){
    $("#alerta").hide();
    obtenerRegistros();

    for(var p = 0; p < paises.length; p++){
        $("#pais").append("<option value='" + paises[p] + "'>" + paises[p] + "</option>");
    }
});

function buscar(txt, pais){
    $.ajax({
        data: {
            tx: escape(txt),
            ps: escape(pais)
        },
        url:   '../php/buscar.php',
        type:  'post',
        beforeSend: function () {
            console.log("buscando...");
        },
        success:  function (response) {
            console.log(response);
            if(response == "false"){
                var txt = $("#texto").val();
                var tipo = $("#tipo").val();
                var desc = $("#descripcion").val();
                var pais = $("#pais").val();
                guardar(txt, pais, desc, tipo);
                obtenerRegistros();
            }else{
                //alerta("alert-info", "esta insulto ya existe en nuestra base de datos");
                alert("esta insulto ya existe en nuestra base de datos");
            }
        }
    });
}

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
                //alerta("alert-success", "Texto guardado exitosamente");
                alert("Texto guardado exitosamente");
            }else{
                //alerta("alert-warning", "Error: " + response);
                console.log("Error: " + response);
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
        buscar(txt, pais);
        $("#modalNuevoTexto").modal("hide");
    }else{
        //alerta("alert-warning", "se deben llenar todos los campos");
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
        rows += "<tr><td>"+unescape(data[d].Texto)+"</td>";
        rows += "<td>"+unescape(data[d].Tipo)+"</td>";
        rows += "<td style='max-width:200px;'>"+unescape(data[d].Descripcion)+"</td>";
        rows += "<td>"+unescape(data[d].Pais)+"</td></tr>";
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
    var trsHide = [];
    var trsShow = [];
    if(texto.length > 0){
        $("#tblContenido tbody tr").each(function(){
            $(this).children().each(function(){
                var txt = $(this).html();
                if(txt.includes(texto)){
                    trsShow.push($(this).parent());
                }else{
                    trsHide.push($(this).parent());
                }
            });
            $(trsHide).each(function(){
                $(this).hide();
            });
            $(trsShow).each(function(){
                $(this).show();
            });
        });
    }else{
        $("#tblContenido tbody tr").show();
    }
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