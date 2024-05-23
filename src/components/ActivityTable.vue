<template>
    <div class="Table">
        <div class="body">
            <el-table v-loading="loading" :data="tableData" class="tableBox" table-layout="fixed" :row-style="{ height: '100px' }" height="100%">
                <el-table-column label="活动名称" width="120" v-if="props.source !== 'user'">
                    <template v-slot="{ row }">
                        <div class="flex justify-start items-center gap-5">
                            <el-icon>
                                <MessageBox />
                            </el-icon>
                            <p>{{ row.type }}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="intro" label="介绍"></el-table-column>
                <el-table-column prop="price" label="价格">
                    <template v-slot="{ row }">
                        <p>¥ {{ row.price }}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="日期" sortable>
                    <template v-slot="{ row }">
                        {{ new Date(row.createdAt).toLocaleString() }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getAllBlindBoxs } from '../api/blindBox';
import { getAllAlbums } from '../api/album';

const props = defineProps(['dateOrder', 'typeOrder', 'source', 'authorId', 'typeSelected', 'conditionSelected']);

const loading = ref(false);
const tableData = ref([]);
const allData = ref([]);
const pageSize = ref(10);
const page = ref(1);

const fetchTableData = async () => {
    loading.value = true;
    const requests = [];

    if (props.typeSelected.includes('盲盒')) {
        requests.push(getAllBlindBoxs().then(data => data.map(item => ({ ...item, type: '盲盒' }))));
    }

    if (props.typeSelected.includes('合成合集')) {
        requests.push(getAllAlbums().then(data => data.map(item => ({ ...item, type: '合成合集' }))));
    }

    const results = await Promise.all(requests);
    allData.value = results.flat();
    sortData();
    updateTableData();
    loading.value = false;
};

const sortData = () => {
    if (props.conditionSelected === '价格降序') {
        allData.value.sort((a, b) => b.price - a.price);
    } else if (props.conditionSelected === '价格升序') {
        allData.value.sort((a, b) => a.price - b.price);
    }
};

const updateTableData = () => {
    const startIndex = (page.value - 1) * pageSize.value;
    const endIndex = page.value * pageSize.value;
    tableData.value = allData.value.slice(startIndex, endIndex).filter(item => item.authorId === props.authorId);
};

onMounted(fetchTableData);

watch(() => props.typeSelected, fetchTableData);
watch(() => props.conditionSelected, () => {
    sortData();
    updateTableData();
});
watch(() => props.dateOrder, (newVal) => {
    if (newVal === '日期正序') {
        allData.value.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (newVal === '日期倒序') {
        allData.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    updateTableData();
});

const handleSizeChange = (val) => {
    pageSize.value = val;
    updateTableData();
};

const handleCurrentChange = (val) => {
    page.value = val;
    updateTableData();
};

const handleSelectionChange = (val) => {
    console.log(val);
};
</script>



<style lang="scss" scoped>
:deep(.el-tag) {
    border-radius: 9px;
}

.Table {
    // width: auto;
    height: 100%;

    background: #fff;
    // border-radius: 16px;



    .header {
        font-size: 26px;
        text-align: start;
        border-bottom: 1px solid var(--primary-200);

        padding: 16px;
    }

    .body {
        display: flex;
        flex-direction: column;

        height: 100%;
        background: #fff;
        border-radius: 20px;

        padding: 16px;

        .StatusSelection {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            gap: 20px;

            // 为item多留出boder的距离
            min-height: 80px;

            padding: 16px;

            .item {
                cursor: pointer;


                transition: all 0.1s ease-out;

                padding: 8px 16px;

                &:hover {
                    color: var(--accent-100);

                    border-bottom: 2px solid var(--accent-100);
                }

                &.active {
                    color: var(--accent-100);
                    border-bottom: 2px solid var(--accent-100);
                }
            }
        }

        .tableBar {
            display: flex;
            justify-content: space-between;
            align-content: center;
            gap: 20px;

            /* 输入框样式 */
            .SearchInput {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex: 1;

                background-color: rgba(250, 250, 250, 1);
                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;

                input {
                    outline: none;
                    padding-left: 10px;
                    font-size: 16px;
                    width: 200px;
                    /* 调整输入框的宽度 */
                    border: 0px;
                    color: rgba(160, 174, 192, 1);
                    background-color: rgba(250, 250, 250, 1);
                }
            }

            /* 筛选框样式 */
            .FilterBox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;


                color: rgba(160, 174, 192, 1);
                background-color: rgba(250, 250, 250, 1);
                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }
        }


    }
}

.tableBox {
    width: 100%;
    // 表格的外部是否有边框
    // border: solid 2px #f3f4f7;
    border-radius: 2px;
}

.pageList {
    text-align: center;
    margin-top: 30px;
}




:deep(.el-checkbox__inner) {
    width: 19px;
    height: 19px;
    border-radius: 22.5px;
}

:deep(.el-checkbox__inner::after) {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    left: 7px;
    top: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
    transform: rotate(50deg) scaleY(1.5);
}
</style>
