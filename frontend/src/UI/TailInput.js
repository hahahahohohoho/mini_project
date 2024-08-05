export default function TailInput({id, type, inRef }) {
    return (
      <div>
        <input type={type} id= {id}
                 ref={inRef}
                 className="bg-gray-50 border
                            border-gray-300
                            text-gray-900 
                            text-sm 
                            rounded-lg
                            focus:ring-blue-500
                            focus:border-blue-500 
                            block w-full p-2.5" />
      </div>
    )
  }