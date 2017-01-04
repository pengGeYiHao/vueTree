<template>
    <div>
        <ul>
            <li v-for="(lis,i) in model">
                <span>{{lis.constent}}</span>
                <template v-if="lis.children">
                    <!--这里的flag就是判断是否折叠-->
                    <template v-if="lis.flag">
                        <div class="isFold" @click="isFoldFn(lis.flag,i)">
                            <span>—</span>
                        </div>
                        <vueTree :model="lis.children"></vueTree>
                    </template>
                    <template v-else>
                        <div class="isFold" @click="isFoldFn(lis.flag,i)">
                            <span>+</span>
                        </div>
                    </template>
                </template>
            </li>
        </ul>
    </div>
</template>
<style>
    ul {
        list-style:none;
    }
    .isFold {
        display:inline-block;
        border:1px solid green;
    }
</style>
<script>
    export default{
        data(){
            return{
            }
        },
        props:['model'],
        methods:{
            isFoldFn(flag,i) {
                this.model[i].flag=(!flag)
            }
        },
        components:{
            vueTree:{
                name:'vueTree',
                props:['model'],
                template:`<ul>
                            <li v-for="(lis,i) in model">
                                <span>{{lis.constent}}</span>
                                <template v-if="lis.children">
                                    <template v-if="lis.flag">
                                        <div class="isFold" @click="isFoldFn(lis.flag,i)">
                                            <span>—</span>
                                        </div>
                                        <vueTree :model="lis.children"></vueTree>
                                    </template>
                                    <template v-else>
                                        <div class="isFold" @click="isFoldFn(lis.flag,i)">
                                            <span>+</span>
                                        </div>
                                    </template>
                                </template>
                            </li>
                          </ul>`,
               methods:{
                    isFoldFn(flag,i) {
                        this.model[i].flag=(!flag)
                    }
               },
            }
        }
    }
</script>
