// import React, { useState, useRef } from 'react';
// import { _localizeText } from 'src/utils/utils';
// import clsx from 'clsx';

// type Props = {};

// const SearchForm = (props: Props) => {
//   const [search, setSearch] = useState<string>('');
//   const [loading, setLoading] = useState<Boolean>(false);
//   const [submited, setSubmited] = useState<Boolean>(false);
//   const inputRef = useRef<HTMLInputElement>();

//   const _onSubmit = async (evt) => {
//     evt.preventDefault();
//   };

//   const isSearching = search !== '' && submited && loading === false

//   return (
//     <form action="" onSubmit={_onSubmit} className="flex">
//       <input
//         ref={inputRef}
//         type="text"
//         name="s"
//         placeholder={`${_localizeText('search')} ...`}
//         value={search}
//         autoComplete="off"
//         onChange={(e) => setSearch(e.target.value)}
//         onMouseEnter={() => inputRef?.current?.focus()}
//         onKeyDown={() => {
//           if (submited) setSubmited(false);
//         }}
//       />
//       <div className="action">
//         <button
//           type="submit"
//           className={clsx('', submited && isSearching ? 'text-black-40' : '')}
//         >
//           OK
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchForm;
