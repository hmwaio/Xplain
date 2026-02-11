import { BlogCardProps } from "../../types/type";

const PostCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <>
      <div className="w-4/5 h-40">
        <div className="mx- border-2 flex flex-col">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p>
            
          </p>
        </div>
      </div>
    </>
  );
};

export default PostCard;
