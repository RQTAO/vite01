<script setup>
import {ref,getCurrentInstance,onMounted,reactive,nextTick} from "vue";
import {ElMessage,ElMessageBox} from "element-plus";
import Mock from "mockjs";
const handleClick = () => {
  console.log('click')
}
const tableData = ref([])
const {proxy} =getCurrentInstance()
const getMallData = async () => {
  let data = await proxy.$api.getMallData(config); // 假设这是获取商品数据的API
  tableData.value = data.list.map(item => ({
    ...item,
    specs : item.specs === 1 ? '件' : '箱'
    // 如果需要额外的处理，可以在这里添加
  }));
  // console.log(data)
  config.total = data.count;
};

const tableLabel = reactive([
  { prop: 'bid', label: '商品编号',width: 180 },
  { prop: 'name', label: '商品名称' },
  { prop: 'specs', label: '规格',width: 60 },
  { prop: 'price', label: '售价', width: 80 },
  { prop: 'birth', label: '生产时间', width: 120},
  { prop: 'addr', label: '生产地址', width: 300},
  { prop: 'stock', label: '库存', width: 60 }
]);
// const formProduct = reactive({
//   bid: '', // 假设编辑时需要商品ID
//   name: '',
//   specs: '',
//   price: '',
//   birth:'',
//   addr:'',
//   stock: '', // 同上
// });
const formInline = reactive({
  keyWord:''
})
const config = reactive({
  name:'',
  total:0,
  page:1
})
//搜索
const handleSearch =()=>{
  config.name =formInline.keyWord
  getMallData()
}
//分页实现
const handleChange = (page)=>{
  config.page = page
  getMallData()
}
//删除
const handleDelete = (val)=>{
  // proxy.$api
  ElMessageBox.confirm("你确定要删除吗?").then(async ()=>{
    await proxy.$api.deleteMall({id:val.id})
    ElMessage({
      showClose:true,
      message:'删除成功',
      type:"success"
    })
    getMallData()
  })
}

//xinzeng
const action = ref('add')
const dialogVisible = ref(false)
const formMall = reactive({
  sex:'1'
})
//表单校验规则
const rules = reactive({
  bid:[{required:true,message:"必填项"}],
  name:[{required:true,message:"必填项",trigger:"blur"}],
  specs:[{required: true,message:"必填项",trigger:"change"}],
  price:[{required:true,message:"必填项"}],
  stock:[{required:true,message:"必填项"}],
  addr:[{required:true,message:"必填项"}],
  birth: [{required:true ,message:"必选项"}],
})
const handleClose =()=>{
  //获取表单重置表单
  dialogVisible.value = false;
  proxy.$refs['mallForm'].resetFields()
}
const handleCancel =()=>{
  dialogVisible.value = false
  proxy.$refs['mallForm'].resetFields()
}
const handleAdd =()=>{
  dialogVisible.value = true
  action.value ='add'
}

const onSubmit =()=>{
  //先要校验
  proxy.$refs['mallForm'].validate(async (valid) => {
    if(valid){
      let res =null;
      formMall.birth =/^\d{4}-\d{2}-\d{2}$/.test(formMall.birth) ? formMall.birth :
          timeFormat(formMall.birth)
      if (action.value === 'add'){
        res = await proxy.$api.addMall(formMall)
      }else {
        res = await proxy.$api.editMall(formMall)
      }
      if(res){
        dialogVisible.value = false
        proxy.$refs['mallForm'].resetFields()
        getMallData()
      }
    }else {
      ElMessage({
        showClose:true,
        message:'请输入正确的内容',
        type:'error'
      })
    }
  })
}

const timeFormat =(time)=>{
  var time =new Date(time)
  var year =time.getFullYear()
  var month =time.getMonth()+1
  var date =time.getDate()
  function add(m){
    return m < 10 ? '0'+m : m
  }
  return year + '-'+add(month)+'-'+add(date)
}

//bianji

const handleEdit = (val)=>{
  action.value ='edit'
  dialogVisible.value = true
  nextTick(()=>{
    Object.assign(formMall,{...val,specs:''+val.specs})
  })
}

onMounted(()=>{
  getMallData()
})
</script>

<template>
  <div class="mall-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入:">
        <el-input placeholder="请输入商品名称" v-model="formInline.keyWord"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :width="item.width ? item.width : 125"
          :prop="item.prop"
          :label="item.label"
      />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        class="pager"
        background
        layout="prev, pager, next"
        size="small"
        :total="config.total"
        @current-change="handleChange"
    />
  </div>
<!--  新增-->
  <el-dialog
      v-model="dialogVisible"
      :title="action === 'add' ? '新增商品' : '编辑商品'"
      width="35%"
      :before-close="handleClose"
  >
    <el-form :inline="true" :model="formMall" :rules="rules" ref="mallForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品编号" prop="bid">
            <el-input v-model="formMall.bid" placeholder="请输入商品编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="formMall.name" placeholder="请输入商品名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="商品规格" prop="specs">
            <el-select v-model="formMall.specs" placeholder="请选择">
              <el-option label="件" value="1"/>
              <el-option label="箱" value="0"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品售价" prop="price">
            <el-input v-model.number="formMall.price" placeholder="请输入商品售价" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="生产日期" prop="birth">
            <el-date-picker
                v-model="formMall.birth"
                type="date"
                placeholder="请输入"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
            label="地址"
            prop="addr">
          <el-input v-model="formMall.addr" placeholder="请输入地址"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="数量" prop="stock">
            <el-input v-model.number="formMall.stock" placeholder="请输入数量" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button type="primary" @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="less">
.mall-header{
  display: flex;
  justify-content: space-between;
}
.table{
  position: relative;
  height: 530px;
  .pager{
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table{
    width: 100%;
    height: 510px;
  }
}
.select-clearn{
  display: flex;
}
</style>
