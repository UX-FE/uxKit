<template>
    <div :class="wrapClasses">
        <div :class="tabsClasses">
            <ul>
                <li v-for="(item,index) in tabs" :key="index" :class="tabitemClasses(item)" @click="clickTab(index)">
                    <slot name="tab-item">
                        {{(item.text)?item.text:item.name}}
                        <span v-if="hasLine" class="line"></span>
                    </slot>
                </li>
            </ul>
        </div>
        <div :class="contentClasses">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import { oneOf } from '../../utils/assist';
    import Icon from '../icon';
    import { prefix } from '../var';
    const tabPrefix = prefix+'tab';

    export default {
        name: 'Tab',
        props: {
            value:{
                type:[String,Number]
            },
            type:{
                type:String,
                default:'noborder',
                validator (value) {
                    return oneOf(value, ['noborder', 'bordered']);
                },
            },
            size:{
                type:String,
                validator (value) {
                    return oneOf(value, ['large', 'small']);
                },
            }
        },
        data(){
            return {
                tabs:[],
                activeTab:this.value,
                selectedIndex:this.value
            }
        },
        computed: {
            wrapClasses () {
                return [
                    `${tabPrefix}`,
                    {
                        [`${tabPrefix}-bordered`]: this.type === 'bordered'
                    }
                ];
            },
            tabsClasses () {
                return `${tabPrefix}-tabs`;
            },
            contentClasses () {
                return `${tabPrefix}-content-wrap`;
            },
            hasLine(){
                if(this.type&&this.type==='bordered'){
                    return false;
                }else{
                    return true;
                }
            }
        },
        mounted () {
        },
        updated () {
        },
        methods: {
            tabitemClasses(item){
                return [
                    `${tabPrefix}-tab-item`,
                    {
                        [`active`]:item.name === this.activeTab
                    }
                ];

            },
            clickTab(index){
                if(this.tabs[index].disabled)return;
                this.activeTab = this.tabs[index].name;
                this.$emit('on-click-tab', this.tabs[index].name);
                this.updateTab();
            },
            updateTab(){
                this.tabs = [];
                var contents = this.$children.filter(item => item.$options.name === 'TabContent');
                contents.forEach((content, index) =>{
                    this.tabs.push({
                        name:content.currentName || index,
                        text:content.label,
                        disabled:content.disabled
                    });
                    if(this.activeTab===content.currentName){
                        content.show = true;
                    }else{
                        content.show = false;
                    }
                });
            }
        },
        watch: {
        }
    };
</script>
