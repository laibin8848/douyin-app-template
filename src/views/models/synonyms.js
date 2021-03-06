import { ref } from 'vue'
import { saveSynonyms } from '@/apis/synonyms'
import { ElMessage } from 'element-plus'

export default function synonymsModelForm() {
  let optMode = 'add'
  const optionId = { value: '' }

  const synonymsFormRef = ref(null)

  const synonymsModel = ref({
    id: '',
    name: '',
    remark: '',
    optionId: ''
  })

  const setOptionId = (id) => {
    optionId.value = id
  }

  const synonymsFormSave = (cb) => {
    synonymsFormRef.value && synonymsFormRef.value.validate().then(() => {
      saveSynonyms(synonymsModel.value).then((res) => {
        if (res.code == 'E000') {
          ElMessage.success(`${optMode == 'edit' ? '编辑': '添加'}同义词操作成功！`)
          synonymsFormVisible.value = false
          cb && cb()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
  }

  const synonymsFormValidateRules = {
    code: [ { required: true, message: '请输入商品编码', trigger: 'blur' } ],
    name: [ { required: true, message: '请输入商品名称', trigger: 'blur' } ],
    description: [ { required: true, message: '请输入商品描述', trigger: 'blur' } ],
    picture: [ { required: true, message: '请上传商品图片', trigger: 'blur' } ]
  }

  const synonymsFormVisible = ref(false)

  const synonymsFormShow = (data = null) => {
    optMode = 'add'
    synonymsFormVisible.value = true
    synonymsModel.value = {}
    synonymsModel.value.optionId = optionId.value
    if(data.id) {
      optMode = 'edit'
      synonymsModel.value = JSON.parse(JSON.stringify(data))
    }
  }

  const synonymsFormHide = () => {
    synonymsFormVisible.value = false
  }

  return {
    synonymsModel,
    synonymsFormRef,
    synonymsFormSave,
    synonymsFormValidateRules,
    synonymsFormVisible,
    synonymsFormShow,
    synonymsFormHide,
    setOptionId
  }
}
