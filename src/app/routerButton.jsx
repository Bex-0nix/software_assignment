import { useStatefulContainer } from './statefulContainerContext';

export default function RouterButton({ route, children, className }) {
  const { setContent, contents, colors, providerRef } = useStatefulContainer();

  function changeRoute(setContent, contents, colors, providerRef) {

    if (contents[route]) {
      setContent(contents[route]['content']);
      return;
    }
    if (providerRef && providerRef.setContent) {
      const { setContent: parentSetContent, contents: parentContents, colors: parentColors, providerRef: parentProviderRef } = providerRef;
      changeRoute(parentSetContent, parentContents, parentColors, parentProviderRef);
    }
    if (!providerRef) {
      console.log('No parent provider found');
      return;
    }
  }

  return (
    <button className={className} onClick={() => changeRoute(setContent, contents, colors, providerRef)}>
      {children || route}
    </button>
  );
}
