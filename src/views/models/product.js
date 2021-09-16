import { ref } from 'vue'
import { saveProduct } from '@/apis/product'
import { ElMessage } from 'element-plus'

export default function productModelForm() {
  let optMode = 'add'

  const productFormRef = ref(null)

  const productModel = ref({
    id: '',
    name: '',
    description: '',
    remark: '',
    picture: '',
    price: '',
    code: ''
  })

  const productFormSave = (cb) => {
    productFormRef.value && productFormRef.value.validate().then(() => {
      saveProduct(productModel.value).then((res) => {
        if (res.code == 'E000') {
          ElMessage.success(`${optMode == 'edit' ? '编辑': '添加'}商品操作成功！`)
          productFormVisible.value = false
          cb && cb()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
  }

  const productFormValidateRules = {
    code: [ { required: true, message: '请输入商品编码', trigger: 'blur' } ],
    name: [ { required: true, message: '请输入商品名称', trigger: 'blur' } ],
    description: [ { required: true, message: '请输入商品描述', trigger: 'blur' } ],
    picture: [ { required: true, message: '请上传商品图片', trigger: 'blur' } ]
  }

  const productFormVisible = ref(false)

  const productFormShow = (data = null) => {
    optMode = 'add'
    productFormVisible.value = true
    productModel.value = {}
    if(data.id) {
      optMode = 'edit'
      productModel.value = JSON.parse(JSON.stringify(data))
    }
  }

  const productFormHide = () => {
    productFormVisible.value = false
  }

  return {
    productModel,
    productFormRef,
    productFormSave,
    productFormValidateRules,
    productFormVisible,
    productFormShow,
    productFormHide
  }
}
