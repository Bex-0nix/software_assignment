import { useStatefulContainer } from './statefulContainerContext';

export default function RouterButton({ route, children, className }) {
  const { setContent, contents, colors, providerRef } = useStatefulContainer();

  function changeRoute(setContent, contents, colors, providerRef) {

    // If the route is found in contents, set the content
    if (contents[route]) {
      setContent(contents[route]['content']);
      return;
    }

    // If route is not found in the current provider, check if there's a parent context (providerRef)
    if (providerRef && providerRef.setContent) {
      const { setContent: parentSetContent, contents: parentContents, colors: parentColors, providerRef: parentProviderRef } = providerRef;

      // Recurse into the parent provider's context if the route is not found in the current context
      changeRoute(parentSetContent, parentContents, parentColors, parentProviderRef);
    }

    // If no parent provider is found, return and do nothing
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
