<template>
    <div v-on:click="close" class="modal-wrapper" id="modalWrapper">
        <div>
            <!--begin::Modal header-->
            <div class="modal-header">
                <!--begin::Modal title-->
                <h2 class="fw-bold">Alterar Pessoa de Contacto</h2>
                <!--end::Modal title-->

                <!--begin::Close-->
                <div class="btn btn-icon btn-sm btn-active-icon-primary">
                    <KTIcon v-on:click="closeCross" icon-name="cross" icon-class="fs-1" />
                </div>
                <!--end::Close-->
            </div>
            <!--end::Modal header-->

            <!--begin::Form-->
            <el-form :model="formInfo" ref="formRef">
                <!--begin::Modal body-->
                <div class="modal-body py-10 px-lg-17">
                    <!--begin::Scroll-->
                    <div class="scroll-y me-n7 pe-7 input-wrapper" id="kt_modal_add_fornecedor_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
                        <!--begin::Input group-->
                        <div class="fv-row mb-8">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semobold mb-2">Nome</label>
                            <!--end::Label-->

                            <!--begin::Input-->
                            <el-form-item prop="nome">
                                <el-input v-model="formInfo.nome" type="text" placeholder="Nome" />
                            </el-form-item>
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->

                        <!--begin::Input group-->
                        <div class="fv-row mb-8">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semobold mb-2">Email</label>
                            <!--end::Label-->

                            <!--begin::Input-->
                            <el-form-item prop="email">
                                <el-input v-model="formInfo.email" type="email"  placeholder="Email"/>
                            </el-form-item>
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->

                        <!--begin::Input group-->
                        <div class="fv-row mb-8">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-semobold mb-2">Contacto</label>
                            <!--end::Label-->

                            <!--begin::Input-->
                            <el-form-item prop="contacto">
                                <el-input v-model="formInfo.contacto" type="number" placeholder="Contacto"/>
                            </el-form-item>
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->

                        <!--begin::Input group-->
                        <div class="fv-row mb-8">
                            <!--begin::Label-->
                            <label class="fs-6 fw-semobold mb-2">Cargo</label>
                            <!--end::Label-->

                            <!--begin::Input-->
                            <el-form-item prop="cargo">
                                <el-input v-model="formInfo.cargo" type="text" placeholder="Cargo"/>
                            </el-form-item>
                            <!--end::Input-->
                        </div>
                        <!--end::Input group-->
                    </div>
                    <!--end::Scroll-->
                </div>
                <!--end::Modal body-->

                <!--begin::Modal footer-->
                <div class="modal-footer flex-center">
                    <!--begin::Button-->
                    <button v-on:click="reset" type="reset" class="btn btn-light me-3" >
                        Repor
                    </button>
                    <!--end::Button-->

                    <!--begin::Button-->
                    <div class="btn btn-lg btn-primary" v-on:click="alterPessoa" >
                        Alterar
                        <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" class="override-mr0" />
                    </div>
                    <!--end::Button-->
                </div>
                <!--end::Modal footer-->
            </el-form>
            <!--end::Form-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddPessoaModal',
    data() {
        return {
            formInfo: {
                nome: "",
                email: "",
                contacto: "",
                cargo: ""
            }
        }
    },
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
    methods: {
        verifyPessoaData() {
            if(this.formInfo.nome.length == 0 || this.formInfo.email.length == 0 || this.formInfo.contacto.length == 0) {
                this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
                return false;
            } else if(this.formInfo.nome.length > 100) {
                this.$emit("open-modal", "O nome não pode exceder 100 caracteres.");
                return false;
            } else if(this.formInfo.email.length > 50) {
                this.$emit("open-modal", "O email não pode exceder 50 caracteres.");
                return false;
            } else if(this.formInfo.cargo.length > 50) {
                this.$emit("open-modal", "O cargo não pode exceder 50 caracteres.");
                return false;
            } else if(this.formInfo.contacto.length > 13 || this.formInfo.contacto.length < 9) {
                this.$emit("open-modal", "Introduza um contacto válido.");
                return false;
            } else if(!(this.formInfo.email.includes("@") && this.formInfo.email.includes(".")) || this.formInfo.email.length < 8) {
                this.$emit("open-modal", "Introduza um email válido.");
                return false;
            } else {
                return true;
            }
        },
        alterPessoa() {
            if(this.verifyPessoaData()) {
                this.$emit("alter-pessoa", this.formInfo);
            } 
        },
        close(e){
            if(e.target.id == "modalWrapper"){
                this.$emit('close-alter-pessoa');
            }
        },
        closeCross(){
            this.$emit('close-alter-pessoa');
        },
        reset() {
            this.formInfo = {...this.info};
        }
    },
    watch: {
        info: function(info) {
            this.formInfo = {...info};
        }
    }
}
</script>

<style scoped>
    .modal-wrapper {
        visibility: hidden;
        position: fixed;
        top: -50px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 2000;
        opacity: 0;
        transition: all 0.25s ease-in;
    }

    .modal-wrapper.show {
        visibility: visible;
        top: 0px;
        opacity: 1;
        transition: all 0.25s ease-in;
    }

    .modal-wrapper > div {
        background-color: rgb(30, 30, 45);
        width: 650px;
        padding: 16px;
        margin: auto;
        margin-top: 100px;
        border-radius: 8px;
        align-content: center;
        text-align: center;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }

    .input-wrapper {
        text-align: left;
    }
</style>