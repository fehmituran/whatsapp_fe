import { useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "./notifications";
import Search from "./search/Search";
import Conversations from "./conversations/Conversations";
import SearchResults from "./search/SearchResults";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);

  console.log(searchResults);

  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* sidebar header */}
      <SidebarHeader />
      {/* Notifications */}
      <Notifications />
      {/* Search */}
      <Search
        searchlength={searchResults.length}
        setSearchResults={setSearchResults}
      />

      {searchResults.length > 0 ? (
        <>
          {/*Search results*/}
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          {/*Conversations*/}
          <Conversations />
        </>
      )}
    </div>
  );
};

export default Sidebar;
