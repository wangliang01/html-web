const btn = document.querySelector('.btn')

btn.onclick = async function() {
  // 打开文件夹
  const itor =  await showDirectoryPicker()
//  const itor =  await showOpenFilePicker() 
 console.log(itor)
}