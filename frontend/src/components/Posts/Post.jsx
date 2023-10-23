import React from 'react';
import { PropTypes } from 'prop-types';
import minus from '../../assets/images/icon-minus.svg';
import plus from '../../assets/images/icon-plus.svg';
import reply from '../../assets/images/icon-reply.svg';
// import edit from '../../assets/images/icon-edit.svg';
// import deleteMe from '../../assets/images/icon-delete.svg';
import amyrobson from '../../assets/images/avatars/image-amyrobson.png';

const Post = (props) => {
  const { attributes } = props;
  return (
    <div className="bg-white p-6 rounded-lg flex gap-4">
      <div>
        <div className="flex flex-col gap-1 grey rounded">
          <div className="px-3 py-2 hover:cursor-pointer"><img src={plus} alt="add" /></div>
          <div className="px-3 py-2 font-bold text-blue-800 hover:text-blue-400">5</div>
          <div className="px-3 py-2 hover:cursor-pointer"><img src={minus} alt="add" /></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 min-w-[97%] pr-4">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex gap-4">
            <div className="px-1 min-w-fit">
              <img src={amyrobson} alt="amy" className="h-8 items-center" />
            </div>
            <div className="px-1 font-bold">Amy Robson</div>
            <div className="px-1">1 month ago</div>
          </div>
          <div className="flex justify-end items-center gap-1 font-bold text-blue-800 hover:text-blue-400 hover:cursor-pointer">
            <img src={reply} alt="add" />
            Reply
          </div>
        </div>
        <div className="min-w-full">comment content</div>
      </div>
    </div>
  );
};

Post.protoTypes = {};

export default Post;
