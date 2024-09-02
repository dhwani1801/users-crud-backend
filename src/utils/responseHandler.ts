 export const sendResponse =(data: any, message: string, statusCode: number) => {
    return {
      data,
      message,
      statusCode,
    };
  };
  