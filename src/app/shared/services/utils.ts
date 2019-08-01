export class Utils {
  public static generateUuid(): string {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }
}
