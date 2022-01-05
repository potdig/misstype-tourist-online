const form = document.getElementById('caption-form')
const subForm = document.getElementById('sub-caption-form')

const defaultCaption = {
  main: "誤字ツーリストOnline",
  sub: "ゲーム名"
}

const replicant = nodecg.Replicant('caption', {
  defaultValue: defaultCaption
})

replicant.on('change', newCaption => {
  form.value = newCaption.main
  subForm.value = newCaption.sub
})

const button = document.getElementById('apply-button')
button.onclick = () => {
  replicant.value = {
    main: form.value,
    sub: subForm.value
  }
}

if (!replicant.value.main) {
  replicant.value = defaultCaption
}
