const labels = document.querySelectorAll('.menu-item .label')
const itemHeight = 40

for (let i = 0; i < labels.length; i++) {
  const label = labels[i]
  
  label.addEventListener('click', function() {
    const subMenu = this.nextElementSibling
    // 找到有opened的元素，先进行关闭
    const openedSubMenu = document.querySelector('.sub-menu[data-status="opened"]')
    if (openedSubMenu) {
      close(openedSubMenu)
    }
    toggle(subMenu)
  })
}


function open(subMenu) {
  if (!subMenu.dataset.status || subMenu.dataset.status === 'closed') {
    // 动态设置subMenu的高度
    animate({
      from: 0,
      to: itemHeight * subMenu.children.length,
      duration: 300,
      onProcess: function(value) {
        subMenu.style.height = value + 'px'
        // 同时设置status 
        subMenu.dataset.status = 'playing'
      },
      onComplete: function() {
        // 设置status 
        subMenu.dataset.status = 'opened'
        
      }
    })
  }
}

function close(subMenu) {
  if (subMenu.dataset.status === 'opened') {
    animate({
      from: itemHeight * subMenu.children.length,
      to: 0,
      duration: 300,
      onProcess: function(value) {
        subMenu.style.height = value + 'px'
         // 同时设置status 
         subMenu.dataset.status = 'playing'
      },
      onComplete: function() {
        // 设置status 
        subMenu.dataset.status = 'closed'
      }
    })
  }
}

function toggle(subMenu) {
  if (subMenu.dataset.status === 'playing') {
    return
  }
  if (subMenu.dataset.status === 'opened') {
    close(subMenu)
  } else {
    open(subMenu)
  }
}