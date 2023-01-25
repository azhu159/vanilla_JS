const carousel = document.querySelector('.carousel')
firstImg = carousel.querySelectorAll('img')[0]
arrowIcons = document.querySelectorAll('.wrapper i')

let positionDiff
let isDragStart = false
let prevPageX, prevScrollLeft
let firstImgWidth //
// let firstImgWidth = firstImg.clientWidth + 14 // getting first img width & adding 14 margin value
// let scrollWidth = carousel.scrollWidth - carousel.clientWidth

const showHideIcons = () => {
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? 'none' : 'block'
    arrowIcons[1].style.display = carousel.scrollLeft === (carousel.scrollWidth - carousel.clientWidth) ? 'none' : 'block'
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', ()=>{
        firstImgWidth = firstImg.clientWidth + 14
        carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth
        setTimeout(()=>{
            showHideIcons()
        }, 60)
    })
})

const autoSlide = () => {
    if (carousel.scrollLeft === (carousel.scrollWidth - carousel.clientWidth)) return 

    positionDiff = Math.abs(positionDiff)
    let firstImgWidth = firstImg.clientWidth + 14 
    let  valDifference  = firstImgWidth - positionDiff 

    if (carousel.scrollLeft > prevScrollLeft) {
        carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
    } else {
        carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : - positionDiff
    }
}

const dragStart = (e) => {
    isDragStart = true 
    prevPageX = e.pageX 
    prevScrollLeft = carousel.scrollLeft // scrollLeft gives the number of px of element content that is scrolled horizontally
}

const dragging = e => {
    // scrolling images to left according to mouse pointer
    if (!isDragStart) return
    e.preventDefault() 
    carousel.classList.add('dragging')
    positionDiff = e.pageX - prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff
    showHideIcons()
}

const dragStop = () => {
    isDragStart = false
    carousel.classList.remove('dragging')
    autoSlide()
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mouseup', dragStop)
carousel.addEventListener('mouseleave', dragStop)