let code = {}

code.base = `
    <template>
        <BaseButton type="primary" @on-click-btn="modal1=true">自定义内容的对话框</BaseButton>
        <BaseButton type="primary" @on-click-btn="modal2=true">自定义主体的对话框</BaseButton>
        <Modal v-model="modal1" @on-close="handleClose1">
            <div class="demo-1">自定义的内容</div>
        </Modal>
        <Modal v-model="modal2" title="标题" @on-close="handleClose2">
            <div slot="body">
                <P>主体的内容1</P>
                <P>主体的内容2</P>
            </div>
        </Modal>
    </template>
    export default {
        data() {
            return {
                modal1:false,
                modal2:false
            };
        },
        methods: {
            handleClose1(val){
                this.modal1 = val;
            },
            handleClose2(val){
                this.modal2 = val;
            }
        },
        mounted() {}
    };
`


export default code
