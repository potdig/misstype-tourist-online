const replicant = nodecg.Replicant("caption", {
  defaultValue: "誤字ツーリストOnline"
})
replicant.on('change', newCaption => {
  const form = document.getElementById('caption-form')
  form.value = newCaption
})