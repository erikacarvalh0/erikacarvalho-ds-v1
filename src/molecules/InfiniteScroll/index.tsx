import React, { useCallback, useRef} from "react"
import "./index.scss"

export const InfiniteScroll = ({
	hasMore,
	loading,
	loadMore,
	children,
  } : any) => {
	const observer = useRef<IntersectionObserver>();
  
	const lastItemRef = useCallback((node: HTMLElement | null) => {
	  if (loading) return;
	  if (observer.current) observer.current.disconnect();
  
	  observer.current = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting && hasMore) {
		  loadMore();
		}
	  });
  
	  if (node) observer.current.observe(node);
	}, [loading, hasMore, loadMore]);
  
	return (
	  <div>
		{React.Children.map(children, (child, index) => {
		  // Attach the ref to the last child
		  if (index === React.Children.count(children) - 1) {
			return <div ref={lastItemRef}>{child}</div>;
		  }
		  return child;
		})}
		{loading && <p>Loading...</p>}
		{!hasMore && <p ref={lastItemRef}>🎉 All data loaded!</p>}
	  </div>
	);
  };