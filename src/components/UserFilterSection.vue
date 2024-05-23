<template>
    <div class="UserFilterSection">
        <div class="Type">
            <p>{{ props.source === 'activity' ? '种类' : '分类' }}</p>
            <el-icon :size="16" @click="toggleTypeList" :class="isTypeListVisible ? 'rotate-180' : 'rotate-0'">
                <ArrowDownBold />
            </el-icon>
            <div class="TypeList" v-if="isTypeListVisible">
                <div v-if=" props.source=== 'activity'" class="TypeListItem" v-for="type in typeList">
                    <label>
                        <input type="checkbox" name="type" :value="type.name" v-model="selectedTypes">
                        <span class="ml-5">{{ type.name }}</span>
                    </label>
                </div>
                <div v-else class="TypeListItem" v-for="type in typeList">
                    <label>
                        <input type="checkbox" name="type" :value="type.objectId" v-model="selectedTypes">
                        <span class="ml-5">{{ type.name }}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="Search">
            <el-icon :size="16">
                <Search />
            </el-icon>
            <input type="text" placeholder="按名称搜索">
        </div>
        <div class="Condition">
            <p>筛选</p>
            <el-icon :size="16" @click="toggleConditionList" :class="isConditionListVisible ? 'rotate-180' : 'rotate-0'">
                <ArrowDownBold />
            </el-icon>
            <div class="ConditionList" v-if="isConditionListVisible">
                <div 
                    class="ConditionListItem" 
                    v-for="(condition, index) in conditionList" 
                    :key="index" 
                    :class="{ selected: selectedCondition === condition }" 
                    @click="selectCondition(condition)"
                >
                    <p>{{ condition }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getAllTypes } from '../api/type';

const props = defineProps(['source']);
const emit = defineEmits(['update:selectedTypes', 'update:selectedCondition']);

let isConditionListVisible = ref(false);
let isTypeListVisible = ref(false);
let typeList = ref([]);
let selectedTypes = ref([]);
let selectedCondition = ref('价格降序');

const conditionList = ['价格降序', '价格升序'];

const toggleConditionList = () => {
    isConditionListVisible.value = !isConditionListVisible.value;
};

const toggleTypeList = () => {
    isTypeListVisible.value = !isTypeListVisible.value;
};

const selectCondition = (condition) => {
    selectedCondition.value = condition;
    emit('update:selectedCondition', condition);
};

onMounted(() => {
    if (props.source === 'activity') {
        typeList.value = [
            {
                objectId: '1',
                name: '盲盒'
            },
            {
                objectId: '2',
                name: '合成合集'
            }
        ];
        selectedTypes.value = typeList.value.map(type => type.name);
    } else {
        getAllTypes().then((res) => {
            typeList.value = res;
            selectedTypes.value = typeList.value.map(type => type.objectId);
        });
    }
    
});

watch(selectedTypes, (newSelectedTypes) => {
    emit('update:selectedTypes', newSelectedTypes);
    console.log(newSelectedTypes);
});

watch(selectedCondition, (newCondition) => {
    emit('update:selectedCondition', newCondition);
});
</script>


<style lang="scss" scoped>
.UserFilterSection {
    display: flex;
    position: relative;
    z-index: 99;

    justify-content: space-between;
    align-items: center;
    gap: 10px;

    width: 100%;

    text-align: center;
    font-size: 18px;
    font-weight: bold;


    margin-top: 20px;
    margin-bottom: 20px;

    .Type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;



        width: 180px;
        height: 50px;

        background-color: #FFFFFF;
        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;

        .rotate-180 {
            transform: rotate(180deg);
            transition: 0.25s ease-out;
        }

        .rotate-0 {
            transition: 0.25s ease-out;
        }

        .TypeList {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;

            position: absolute;
            top: 60px;
            left: 0px;

            width: 180px;

            background-color: #FFFFFF;
            border-radius: 12px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

            padding: 10px;

            .TypeListItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                width: 100%;
                height: 100%;

                border-radius: 12px;
                padding: 15px;
            }

            .TypeListItem:hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.1);
            }

            /* 勾选框变大，勾选背景颜色为var(--bg-100)，勾选时颜色为var(--bg-200) */
            input[type="checkbox"] {
                transform: scale(1.5);


            }

        }
    }

    .Search {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;


        height: 50px;

        background-color: #FFFFFF;

        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;

        input {
            outline: none;
            padding-left: 10px;
            font-size: 18px;
            width: 200px;
            border: 0px;
            font-weight: bold;
        }
    }

    .Condition {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        position: relative;


        width: 250px;
        height: 50px;

        background-color: #FFFFFF;
        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        padding: 12px;

        .rotate-180 {
            transform: rotate(180deg);
            transition: 0.25s ease-out;
        }

        .rotate-0 {
            transition: 0.25s ease-out;
        }

        .ConditionList {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;

            position: absolute;
            top: 60px;
            right: 0px;

            width: 250px;

            background-color: #FFFFFF;
            border-radius: 12px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

            padding: 10px;

            .ConditionListItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                width: 100%;
                height: 100%;

                border-radius: 12px;
                padding: 15px;
            }

            .ConditionListItem:hover{
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.1);
            }
            .ConditionListItem.selected {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.2);
            }
        }
    }
}
</style>
