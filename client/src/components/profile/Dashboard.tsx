

// function Dashboard(showActions: boolean) {
//   const [showMenu, setShowMenu] = useState(false)
//   return (
//     <div>
//       {/* Actions Menu (for own posts) */}
//             {showActions && (
//               <div className="relative">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setShowMenu(!showMenu);
//                   }}
//                   className="p-2 text-black hover:bg-gray-100 rounded-full cursor-pointer"
//                 >
//                   <MoreHorizontal className="w-5 h-5" />
//                 </button>

//                 {showMenu && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         Navigate(`/posts/${post.post_id}/edit`);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-50"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         // Handle delete
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//     </div>
//   )
// }

// export default Dashboard