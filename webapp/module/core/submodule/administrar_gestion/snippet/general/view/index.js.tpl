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
            if(responseText.res ==1){
                    var input = document.getElementById('input_archivo');
                    var file = input.files[0];
                    if(file==undefined){
            		general_btn_submit.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                        if(responseText.accion =='update') {
                            // swal("Buen Trabajo!", "Se guardo todo con exito!", "success")
                                //console.log("Actualizó : "+responseText.id);
                                swal({type: 'success',title: 'Buen Trabajo! Se guardo todo con exito!',showConfirmButton: false,timer: 1000});
                            }else{location = "{/literal}{$getModule}{literal}&accion=itemUpdate&id="+responseText.id+"&type=update&gestion={/literal}{$item.gestion_itemId}{literal}";
                      
                                }
                    }
                    else{
                        var data = new FormData();
                        data.append('archivo', file);
                        data.append('id',responseText.id);
                        jQuery.ajax({
                            url: 'http://localhost:3000/resoluciones/',
                            data: data,
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'POST',
                            success: function(data){

            			general_btn_submit.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                                if(responseText.accion =='update') {
                                // swal("Buen Trabajo!", "Se guardo todo con exito!", "success")
                                    //console.log("Actualizó : "+responseText.id);
                                    swal({type: 'success',title: 'Buen Trabajo! Se guardo todo con exito!',showConfirmButton: false,timer: 1000});
                                }else{location = "{/literal}{$getModule}{literal}&accion=itemUpdate&id="+responseText.id+"&type=update&gestion={/literal}{$item.gestion_itemId}{literal}";
                        
                                    }
                                },
                            error: function(err){
                            swal("Ocurrio un error!", responseText.msg, "error")

                            }
                        });
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

            general_form.ajaxForm(options);
        };

        var handle_general_form_submit = function() {
            $('#descargar_archivo').click(function(){
                var nombre=String("{/literal}{$item.resolucion_path}{literal}").split(".");
        
                window.open("http://localhost:3000/files/resoluciones/"+nombre[0]);
                return false;
            })
            $('#input_archivo').on('change', function() {
                let fileName = $(this).val().split('\\').pop();
                $(this).next('.custom-file-label').addClass("archivo").html(fileName);
            });
            $('.fecha_general').datepicker({
                todayHighlight: true,
                orientation: "bottom left",
                format: 'dd/mm/yyyy',
                templates: {
                    leftArrow: '<i class="la la-angle-left"></i>',
                    rightArrow: '<i class="la la-angle-right"></i>'
                }
            });

            general_btn_submit.click(function(e) {
                options={
                beforeSubmit:showRequest
                , dataType: 'json'
                , success:  showResponse
                , data: {
                    accion:'{/literal}{$subcontrol}_itemupdatesql{literal}'
                    ,itemId:idficha
                    ,type:type

                }};    
                e.preventDefault();
                var btn = $(this);
                var form = $(this).closest('form');
                handle_form_submit();
                if (!form.valid()) {
                    return;
                }
                general_form.submit();
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
            }
        };
    }();

    //== Class Initialization
    jQuery(document).ready(function() {
        $("#municipio_itemId").change(function(){
            var muniId = $("#municipio_itemId option:selected").val();
            var tipo='{/literal}{$type}{literal}';
        var url = '{/literal}{$getModule}{literal}&accion=itemUpdate&id='+muniId+'&type='+tipo+'&gestion={/literal}{$item.gestion_itemId}{literal}';
        location=url;
        });
        snippet_general_form.init();
    });

</script>
{/literal}