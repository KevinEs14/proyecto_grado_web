{literal}
<script>
    var snippet_general_form = function() {
        var idficha = '{/literal}{$id}{literal}';
        var type = '{/literal}{$type}{literal}';
        var general_form = $('#general_form');
        var general_btn_submit = $('#general_submit');
        //== Private Functions
        var showRequest= function(formData, jqForm, op) {
            general_btn_submit.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);
            return true;
        };
        var showResponse = function (responseText, statusText) {
            general_btn_submit.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
            if(responseText.res ==1){
                console.log("test: "+responseText.accion);
                if(responseText.accion =='update') {
                   // swal("Buen Trabajo!", "Se guardo todo con exito!", "success")
                    swal({type: 'success',title: 'Buen Trabajo! Se guardo todo con exito!',showConfirmButton: false,timer: 1000});
                    //console.log("Actualizó : "+responseText.id);
                }else{
                    location = "{/literal}{$getModule}{literal}&accion=itemUpdate&id="+responseText.id+"&type=update";
                    console.log("es nuevo : "+responseText.id);
                }
            }else if(responseText.res ==2){
                swal("Ocurrio un error!", responseText.msg, "error")
            }else{
                swal("ocurrio un error!", responseText.msg, "danger")
            }
        };

        var options = {
            beforeSubmit:showRequest
            , dataType: 'json'
            , success:  showResponse
            , data: {
                accion:'{/literal}{$subcontrol}_itemupdatesql{literal}'
                ,itemId:idficha
                ,type:type

            }
        };
        var handle_form_submit=function(){
            obtenerDatosFilas();
            general_form.ajaxForm(options);
        };
        var obtenerDatosFilas=function(){
        var aux=JSON.parse('{/literal}{$filas|json_encode}{literal}')
        var type = '{/literal}{$type}{literal}';
            var filas=[];
            for(i=0;i<8;i++){
                    filas[i]=[
                        type=="new"?null:aux[i]["itemId"],
                        i+1,
                        $("#cantidad"+(i+1)).val(),
                    ]
                }
            console.log(filas);
            return filas;
        }
        var calcularTotal=function(){            
            var filas=JSON.parse('{/literal}{$filas|json_encode}{literal}');
            var total=0;
            console.log(filas);
            for(i=0;i<filas.length;i++){
                total+=Number(filas[i]["cantidad"]);

            }  
            console.log(total); 
            $("#total_chalecos").val(total);  
        }
        var modificarTotal=function(){
            for(i=0;i<8;i++){
                $("#cantidad"+(i+1)).change(function(){
                   calcularTotalInput();   
                });
            }
        }
         var calcularTotalInput=function(){
            var filas=JSON.parse('{/literal}{$filas|json_encode}{literal}');
            var total=0;
            console.log(filas);
            for(i=0;i<filas.length;i++){
                total+=Number($("#cantidad"+(i+1)).val());

            }  
            console.log(total); 
            $("#total_chalecos").val(total);       


        };
        var verificarTotal=function(){
            var filas=JSON.parse('{/literal}{$filas|json_encode}{literal}');
            var total=0;
            console.log(filas);
            for(i=0;i<filas.length;i++){
                total+=Number(filas[i]["cantidad"]);

            }  
            console.log(total); 
            $("#total_chalecos").val(total);       


        };

        var handle_general_form_submit = function() {

            general_btn_submit.click(function(e) {
                
                options={
                beforeSubmit:showRequest
                , dataType: 'json'
                , success:  showResponse
                , data: {
                    accion:'{/literal}{$subcontrol}_itemupdatesql{literal}'
                    ,itemId:idficha
                    ,type:type
                    ,filas:JSON.stringify(obtenerDatosFilas())

                }};  
                e.preventDefault();
                var btn = $(this);
                var form = $(this).closest('form');
                handle_form_submit();

                if (!form.valid()) {
                    return;
                }swal({
                        title: '¿Esta seguro de agregar el nuevo registro?',
                        text: "Una vez registrado no podra modificarlo ni eliminarlo.",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Si, agregar',
                        cancelButtonText: "No, cancelar"
                    }).then(function(result) {
                        if (result.value) {
                            general_form.submit();
                        }
                    });
            });
        };

        var handle_general_components = function(){

            $('.select2_general').select2({
                placeholder: "Seleccione una opción"
            });

        };


        //== Public Functions
        return {
            // public functions
            init: function() {
                handle_general_form_submit();
                handle_form_submit();
                handle_general_components();
                calcularTotal();
                modificarTotal();
            }
        };
    }();

    //== Class Initialization
    jQuery(document).ready(function() {
        snippet_general_form.init();
    });

</script>
{/literal}