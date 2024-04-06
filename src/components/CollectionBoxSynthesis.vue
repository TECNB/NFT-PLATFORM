<template>
    <div class="CollectionBoxSynthesis" v-if="props.ifShow">
        <div class="Background">
            <div class="Title">
                <p class="text-lg font-medium">选择藏品并指定合成后的藏品</p>
            </div>
            <div class="Close" @click="toggleVisibility">
                <el-icon :size="22">
                    <Close />
                </el-icon>
            </div>
        </div>
        <div class="Content">
            <!-- v-for从CreatedCollection.collections中获取数据 -->
            <p class="text-left text-lg font-medium">合成后的藏品</p>
            <div v-for="(item, index) in CreatedCollection.collections" :key="index"
                class="flex justify-start items-center gap-5 cursor-pointer rounded-xl mt-5 p-3"
                @click="changeSynthesisedCollection(index)" :class="{ 'bg-gray-100': synthesisedCollection === item }">
                <img class="w-16 h-16 rounded-lg" :src="item.cover" alt="" />
                <div class="flex justify-center items-start flex-col w-20">
                    <p class="text-left text-lg font-bold">{{ item.name }}</p>
                    <p class="text-left text-lg font-medium">{{ item.price }} ETH</p>
                </div>
            </div>
            <p class="text-left text-lg font-medium mt-5">待收集的藏品</p>

            <div v-for="(item, index) in CreatedCollection.collections" :key="index"
                class="flex justify-start items-center gap-5 cursor-pointer rounded-xl mt-5 p-3"
                @click="changeSelectedCollection(index)" :class="{ 'bg-gray-100': selectedCollection.includes(item) }">
                <img class="w-16 h-16 rounded-lg" :src="item.cover" alt="" />
                <div class="flex justify-center items-start flex-col w-20">
                    <p class="text-left text-lg font-bold">{{ item.name }}</p>
                    <p class="text-left text-lg font-medium">{{ item.price }} ETH</p>
                </div>
            </div>

            <div class="Complete cursor-pointer" @click="toggleVisibility">
                <p>确定添加</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, computed } from "vue"
import { Collection } from '../interfaces/Collection';


// 引入CartListCollectionStore
import { CartListCollectionStore, CreatedCollectionStore } from '../stores/CollectionStore'

import { getCollectionById, getCreatedCollection } from '../api/collections'
import { changeAvatar } from '../api/user';

// 实例化CartListCollectionStore
let CartListCollection = CartListCollectionStore()
const CreatedCollection = CreatedCollectionStore()

const props = defineProps(['ifShow']);
const emit = defineEmits();

// 定义一个数组用于储存购物车的内容,并且为响应式
let cartList = ref<Collection[]>([])
// 定义一个变量isDeleteVisible
let isDeleteVisible = cartList.value.map(() => ref(false));

let isCreatedCollectionNull = ref(true);

let loading = ref(false);
// 定义一个变量用于储存num数组的最大值
let maxNumber = ref<number[]>([]);

let ifDisabled = false;

// 选中的藏品
let selectedCollection = ref<Collection[]>([]);
// 合成后的藏品
let synthesisedCollection = ref<Collection>();



// 定义一个变量用于控制是否展示购物车为空的情况
let isCartNullVisible = false;
// 定义一个变量用于储存cartList数组的总数
let cartListLength = cartList.value.length;
// 定义一个变量用于储存购物车的总价
let totalPrice = 0;

// 定义一个数组用于储存购物车的内容,并且为响应式
let num = ref<number[]>([]);


onMounted(async () => {
    loading.value = true


    // 设置通过空数组防止重复存入
    CreatedCollection.collections = []
    await getCreatedCollection().then((res) => {
        CreatedCollection.collections = res
    })
    // 设置num数组初始值为0
    num.value = Array(CreatedCollection.collections.length).fill(0);



    // 定义变量表示collectionItems的长度

    let createdCollectionItemsLength = CreatedCollection.collections.length

    // 如果collectionItemsLength=0时，isOwnedCollectionNull为true
    if (createdCollectionItemsLength !== 0) {
        isCreatedCollectionNull.value = false
    }
})

// 计算属性，用于判断是否选中某个 item
const isItemSelected = (item: Collection) => {
    return selectedCollection.value.includes(item);
};

// 计算最大值数组
/**
 * 监听 num 的变化，并根据 num 的值更新 maxNumber。
 * 如果 num 的和大于 1，则将 maxNumber 的每个值设置为 num 的对应值乘以 1/sum 保留为一位小数,剩下的maxNumber改为0。
 * 如果 num 的和小于等于 1，则将 maxNumber 设置为1。
 * @param {Array} num - 要监听的数组
 * @param {Array} maxNumber - 要更新的数组
 */
watch(num, () => {
    // 计算 num 的和,并保留一位小数
    let sum = Number(num.value.reduce((prev, curr) => prev + curr, 0).toFixed(1));
    console.log(sum)
    if (sum == 1) {
        // maxNumber 的每个值设置为 num 的对应值乘以 1/sum 保留为一位小数,剩下的maxNumber改为0
        maxNumber.value = num.value.map((value) => {
            if (value === 0) {
                return 0;
            }
            return Number((1 / sum).toFixed(1));
        });
        ifDisabled = true;

    } else if (sum < 1) {
        maxNumber.value = Array(num.value.length).fill(1);
    }
}, { deep: true });

// 点击改变选中后的藏品selectedCollection
const changeSelectedCollection = (index: number) => {
    const selectedItem = CreatedCollection.collections[index];
    if (selectedCollection.value.includes(selectedItem)) {
        selectedCollection.value = selectedCollection.value.filter(item => item !== selectedItem);
    } else {
        selectedCollection.value.push(selectedItem);
    }
};
// 点击改变选中后的藏品synthesisedCollection
const changeSynthesisedCollection = (index: number) => {
    synthesisedCollection.value = CreatedCollection.collections[index]
    emit('update', synthesisedCollection.value)
}


//当cartList改变时，isDeleteVisible也重新赋值
watch(cartList.value, (newValue) => {
    isDeleteVisible = newValue.map(() => ref(false));

    cartListLength = newValue.length;
    totalPrice = calculateTotalPrice(newValue);
})
//当cartList改变时，isDeleteVisible也重新赋值
watch(CartListCollection.collections, (newValue) => {
    cartList.value = newValue;
    isDeleteVisible = newValue.map(() => ref(false));

    // 如果cartList为空则显示还没有任何商品,快去购物吧
    if (cartList.value.length === 0) {
        isCartNullVisible = true
    } else {
        isCartNullVisible = false
    }
    totalPrice = calculateTotalPrice(cartList.value);
})

// 重置概率
const resetProbability = () => {
    num.value = Array(CreatedCollection.collections.length).fill(0);
    maxNumber.value = Array(CreatedCollection.collections.length).fill(1);
    ifDisabled = false;
}

// 实现handleChange方法
const handleChange = (index: number, value: number) => {
    num[index] = value;
    // 通过num数组的值算出maxNumber数组的值
    // 总记所有的maxNumber数组的值不能超过1的值
    let sum = 0;
    for (let i = 0; i < num.value.length; i++) {
        sum += num.value[i];
    }
    for (let i = 0; i < num.value.length; i++) {
        maxNumber[i] = 1 - sum;
    }



};


// 实现toggleVisibility方法
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
        totalPrice += Number(cartList.value[i].price);
    }
    // 最后保留两位小数
    totalPrice = Number(totalPrice.toFixed(2));
    if (cartList.value.length == 0) {
        isCartNullVisible = true
    }
}

const calculateTotalPrice = (list: any[]) => {
    let totalPrice = 0;
    for (let i = 0; i < list.length; i++) {
        totalPrice += Number(list[i].price);
    }
    return Number(totalPrice.toFixed(2));
};
const updateCartData = () => {
    cartList.value = CartListCollection.collections;
    cartListLength = cartList.value.length;

    if (cartList.value.length === 0) {
        isCartNullVisible = true;
    }

    isDeleteVisible = cartList.value.map(() => ref(false));
    cartListLength = cartList.value.length;

    totalPrice = calculateTotalPrice(cartList.value);
};



</script>

<style lang="scss" scoped>
.CollectionBoxSynthesis {
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
            margin-top: 20px;

        }
    }
}

:deep(.el-input) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
    border-radius: 12px;
}

:deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__increase:hover) {
    color: var(--accent-200);
}

:deep(.el-input-number__decrease:hover) {
    color: var(--accent-200);
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset !important;
}
</style>
