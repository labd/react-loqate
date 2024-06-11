type ReactLocateErrorCode = 'NO_ITEMS_RETRIEVED';

export class ReactLoqateError extends Error {
  public code: ReactLocateErrorCode;

  constructor({
    message,
    code,
  }: {
    message: string;
    code: ReactLocateErrorCode;
  }) {
    super(message);
    this.code = code;
  }
}

export class LoqateError extends Error {
  public Cause: string;
  public Description: string;
  public Error: string;
  public Resolution: string;

  constructor({
    Description,
    Cause,
    Error,
    Resolution,
  }: {
    Description: string;
    Cause: string;
    Error: string;
    Resolution: string;
  }) {
    super(Description);
    this.Cause = Cause;
    this.Description = Description;
    this.Error = Error;
    this.Resolution = Resolution;
  }
}
