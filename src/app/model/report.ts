const API_URL = 'https://insiderprotocol.com/api/external/imperium/report';

export interface ReportResponse {
  status: boolean;
}

export interface ReportErrorResponse {
  message: string;
  errors: {
    message: string[]
  }
}

export const SendReport = async (message: string): Promise<ReportResponse | ReportErrorResponse> => {
  const response = await fetch(API_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ message }), // body data type must match "Content-Type" header
    });

  if (response.status === 422) {
    const res: ReportErrorResponse = await response.json();
    return res;
  }
  if (response.status === 200) {
    const res: ReportResponse = await response.json();
    return res;
  }

  return {
    status: false,
  };
};
