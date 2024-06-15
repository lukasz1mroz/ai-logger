const getDiffProps = (obj1: any, obj2: any, prefix = ''): string[] => {
    const diffProps: string[] = [];
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  
    allKeys.forEach(key => {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
  
      if (!(key in obj1) || !(key in obj2) || typeof obj1[key] !== typeof obj2[key]) {
        diffProps.push(newPrefix);
      } else if (Array.isArray(obj1[key]) || Array.isArray(obj2[key])) {
        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          diffProps.push(newPrefix);
        }
      } else if (typeof obj1[key] === 'object' && obj1[key] !== null && obj2[key] !== null) {
        const nestedDifferentiators = getDiffProps(obj1[key], obj2[key], newPrefix);
        diffProps.push(...nestedDifferentiators);
      } else if (obj1[key] !== obj2[key]) {
        diffProps.push(newPrefix);
      }
    });
  
    return diffProps;
  }