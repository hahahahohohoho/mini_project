
export default function ButtonC({caption,bcolor,handleClick}) {
  const colorB = {
    'yellow': 'bg-yellow-400',
    'green' : 'bg-green-400'
    
  }
  const colorBHover = {
    'blue': 'hover : bg-blue-800',
    'orange': 'hover : bg-orange-800'
  }

    return (
    <button className={`inline-flex px-10 py-3 rounded-md mx-2 justify-center items-center
                     text-white font-bold ${colorB[bcolor]} ${colorBHover[bcolor]}`}
        onClick={handleClick}>
      {caption}
    </button>
  )
}
