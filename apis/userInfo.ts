
const backPreUrl = process.env.BACK_PRE_URL || "http://localhost:3000";

export function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return new Promise((resolve) => {
    // api.post(
    //   `${backPreUrl}/api/auth/login`,
    //   {
    //     email,
    //     password,
    //   },
    //   (res: any) => {
    //     resolve(res);
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  });
}

export function GetProfile() {
  return new Promise(async (resolve, reject) => {
    // api.get(
    //   `${backPreUrl}/api/auth/profile`,
    //   {},
    //   (res: any) => {
    //     resolve(res);
    //   },
    //   (error: any) => {
    //     console.log("error", error);
    //     reject(error);
    //   }
    // );
    // const controller = new AbortController();
    // const { signal } = controller;
    // fetch(`${backPreUrl}/api/auth/profile`, { signal })
    //   .then((res) => {
    //     resolve(res);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     reject(err);
    //   });

  });
}
