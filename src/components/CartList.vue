<template>
    <div class="CartList" v-if="props.ifShow">
        <div class="Background">
            <div class="Title">
                <h2>购物车</h2>
            </div>
            <div class="Close" @click="toggleVisibility">
                <el-icon :size="22">
                    <Close />
                </el-icon>
            </div>
        </div>
        <div class="Content">
            <p style="margin-top: 20%;" v-if="isCartNullVisible">还没有任何商品,快去购物吧</p>
            <div class="Detail" v-if="!isCartNullVisible">
                <div class="DetailUp">
                    <p>{{ cartListLength }} 件商品</p>
                    <p @click="clearAll">清除所有</p>
                </div>
                <div class="DetailBelow" v-for="(item, index) in cartList" :key="index" @mouseover="showDelete(index)"
                    @mouseleave="hideDelete()">
                    <div class="DetailBelowName" style="flex: 10;">
                        <div class="Image" style="flex: 3;">
                            <img :src="item.imageUrl" alt=""
                                style="height: 100%; width: 100%; border-radius: 20px; object-fit: cover; aspect-ratio: 1/1;">
                        </div>
                        <div style="flex: 11;">
                            <p style="text-align: start;padding-left: 25px;font-weight: bold;">{{ item.title }}</p>
                            <p style="text-align: start;padding-left: 25px;">{{ item.title }}</p>
                        </div>

                    </div>

                    <div style="flex: 1;">
                        <p v-if="isDeleteVisible[index] && !isDeleteVisible[index].value">{{ item.price }}</p>

                        <div @click="deleteCart(index)" v-else>
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </div>


                    </div>

                </div>
            </div>
            <div class="Price" v-if="!isCartNullVisible">
                <p>总记</p>
                <p>${{ totalPrice }}</p>
            </div>
            <div class="payMethod" v-if="!isCartNullVisible">
                <p>支付方式</p>

                <label>
                    <input class="radio" type="radio" name="paymentMethod" value="alipay" checked>
                    支付宝
                </label>

                <label>
                    <input class="radio" type="radio" name="paymentMethod" value="wechat">
                    微信支付
                </label>
            </div>

            <div class="Complete">
                <p>结算</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue"
import { Collection } from '../interfaces/Collection';
// 引入CartListCollectionStore
import { CartListCollectionStore } from '../stores/CollectionStore'

// 实例化CartListCollectionStore
let CartListCollection = CartListCollectionStore()

const props = defineProps(['ifShow']);
const emit = defineEmits();

// 定义一个数组用于储存购物车的内容,并且为响应式

const cartList = ref<Collection[]>([])

// 初始赋值
cartList.value = CartListCollection.collections;


// 定义一个变量用于控制是否展示购物车为空的情况
let isCartNullVisible = false;
// 定义一个变量用于储存cartList数组的总数
let cartListLength = cartList.value.length;
// 定义一个变量用于储存购物车的总价
let totalPrice = 0;
// 通过cartList的price算出totalPrice，因为price是字符串类型，所以需要转换为数字类型
// 同时需要把price后面的ETH去掉
for (let i = 0; i < cartList.value.length; i++) {
    totalPrice += Number(cartList.value[i].price.replace(' ETH', ''));
}
// 最后保留两位小数
totalPrice = Number(totalPrice.toFixed(2));


// 如果cartList为空则显示还没有任何商品,快去购物吧
if (cartList.value.length === 0) {
    isCartNullVisible = true
}

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

// 实现clearAll方法将cartList清空
const clearAll = () => {
    cartList.value.splice(0, cartList.value.length);
    cartListLength = cartList.value.length;
    totalPrice = 0;
    isCartNullVisible = true;
}

// 定义一个变量isDeleteVisible
let isDeleteVisible = cartList.value.map(() => ref(false));

//当cartList改变时，isDeleteVisible也重新赋值
watch(cartList.value, (newValue, oldValue) => {
    isDeleteVisible = newValue.map(() => ref(false));
    console.log('watch 已触发', oldValue)
    // 定义一个变量用于储存cartList数组的总数
    cartListLength = cartList.value.length;
    // 定义一个变量用于储存购物车的总价
    totalPrice = 0;
    // 通过cartList的price算出totalPrice，因为price是字符串类型，所以需要转换为数字类型
    // 同时需要把price后面的ETH去掉
    for (let i = 0; i < cartList.value.length; i++) {
        totalPrice += Number(cartList.value[i].price.replace(' ETH', ''));
    }
    // 最后保留两位小数
    totalPrice = Number(totalPrice.toFixed(2));
})


// 实现showDelete方法
const showDelete = (index: number) => {
    isDeleteVisible.forEach((item, i) => (item.value = i === index));
};
// 实现hideDelete方法
const hideDelete = () => {
    isDeleteVisible.forEach((item) => (item.value = false));
};
// 实现Delete方法
const deleteCart = (index: number) => {
    cartList.value.splice(index, 1);
    cartListLength = cartList.value.length;
    totalPrice = 0;
    // 通过cartList的price算出totalPrice，因为price是字符串类型，所以需要转换为数字类型
    // 同时需要把price后面的ETH去掉
    for (let i = 0; i < cartList.value.length; i++) {
        totalPrice += Number(cartList.value[i].price.replace(' ETH', ''));
    }
    // 最后保留两位小数
    totalPrice = Number(totalPrice.toFixed(2));
    if (cartList.value.length == 0) {
        isCartNullVisible = true
    }
}


</script>

<style lang="scss" scoped>
.CartList {
    width: 375px;
    min-height: 100%;

    position: absolute;
    z-index: 99999;

    // 靠右对齐
    right: 2%;
    top: 2%;


    background: #ffffff;
    border-radius: 20px 20px 0px 0px;
    text-align: left;

    padding: 20px;

    .Background {
        display: flex;
        justify-content: space-between;
        align-items: center;


        height: 10%;

        border-radius: 20px 20px 0px 0px;
        border-bottom: 0.5px solid var(--text-200);

        margin-left: -20px;
        margin-right: -20px;
        margin-top: -20px;
        padding: 20px;


    }

    .Content {

        text-align: center;

        margin-top: 20px;

        .Detail {
            border-bottom: 0.5px solid var(--text-200);

            padding-bottom: 30px;

            .DetailUp {
                display: flex;
                justify-content: space-between;
                align-items: center;

                font-weight: bold;

                margin-bottom: 10px;
            }

            .DetailBelow {
                display: flex;
                justify-content: flex-start;
                align-items: center;



                font-size: 16px;


                margin-top: 10px;
                padding: 5px;

                .DetailBelowName {
                    display: flex;
                    justify-content: center;
                    align-items: center;


                    .Image {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                .icon {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                }
            }

            .DetailBelow:hover {
                border-radius: 20px;
                height: 100%;
                background-color: var(--accent-100);
            }
        }

        .Price {
            display: flex;
            justify-content: space-between;
            align-items: center;

            font-size: 20px;
            font-weight: bold;

            margin-top: 20px;
        }

        .payMethod {
            display: flex;
            justify-content: space-between;
            align-items: center;

            font-size: 20px;
            font-weight: bold;

            margin-top: 10px;

            // radio选中时的颜色
            .radio {
                accent-color: var(--accent-200);
            }
        }

        .Complete {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;


            height: 50px;

            background-color: var(--bg-200);
            color: var(--accent-200);

            border-radius: 12px;
            border: 0.5px solid var(--text-200);
            font-weight: bold;


            padding: 12px;
            margin-top: 50px;

        }
    }
}
</style>
