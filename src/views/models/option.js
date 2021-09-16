import { ref } from 'vue'
import { saveOption } from '@/apis/option'
import { ElMessage } from 'element-plus'

export default function optionModelForm() {
  let optMode = 'add'

  const optionFormRef = ref(null)

  const optionModel = ref({
    id: '',
    name: '',
    remark: ''
  })

  const optionFormSave = (cb) => {
    optionFormRef.value && optionFormRef.value.validate().then(() => {
      saveOption(optionModel.value).then((res) => {
        if (res.code == 'E000') {
          ElMessage.success(`${optMode == 'edit' ? '编辑': '添加'}选项操作成功！`)
          optionFormVisible.value = false
          cb && cb()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
  }

  const optionFormValidateRules = {
    name: [ { required: true, message: '请输入选项名称', trigger: 'blur' } ],
    remark: [ { required: true, message: '请输入选项描述', trigger: 'blur' } ]
  }

  const optionFormVisible = ref(false)

  const optionFormShow = (data = null) => {
    optMode = 'add'
    optionFormVisible.value = true
    optionModel.value = {}
    if(data.id) {
      optMode = 'edit'
      optionModel.value = JSON.parse(JSON.stringify(data))
    }
  }

  const optionFormHide = () => {
    optionFormVisible.value = false
  }

  return {
    optionModel,
    optionFormRef,
    optionFormSave,
    optionFormValidateRules,
    optionFormVisible,
    optionFormShow,
    optionFormHide
  }
}
