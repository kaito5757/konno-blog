export class UserId {
  constructor(private userId: string) {}

  get value(): string {
    return this.userId
  }
}

export class UserName {
  private userName: string

  constructor(userName: string) {
    if (userName.length < 3) {
      throw new Error('ユーザー名は3文字以上です。')
    }
    if (userName.length > 20) {
      throw new Error('ユーザー名は20文字以下です。')
    }

    this.userName = userName
  }

  get value(): string {
    return this.userName
  }
}

export class User {
  private readonly userId: UserId
  private userName: UserName

  constructor(userName: UserName) {
    this.userId = new UserId(Math.random().toString(36).substring(2, 10))
    this.userName = userName
  }

  public changeName(userName: UserName): void {
    this.userName = userName
  }

  get id(): UserId {
    return this.userId
  }

  get name(): UserName {
    return this.userName
  }
}

export interface IUserRepository {
  findById(userId: UserId): User | null
  findByName(userName: UserName): User | null
  save(user: User): void
  delete(user: User): void
}

export class UserRepository implements IUserRepository {
  private readonly userDataStore: { userId: string; userName: string }[]

  public findById(userId: UserId): User | null {
    const user = this.userDataStore.find((user) => user.userId === userId.value)
    return user ? new User(new UserName(user.userName)) : null
  }

  public findByName(userName: UserName): User | null {
    const user = this.userDataStore.find((user) => user.userName === userName.value)
    return user ? new User(new UserName(user.userName)) : null
  }

  public save(user: User): void {
    const index = this.userDataStore.findIndex((userData) => userData.userId === user.id.value)
    if (index === -1) {
      this.userDataStore.push({ userId: user.id.value, userName: user.name.value })
    } else {
      this.userDataStore[index].userName = user.name.value
    }
  }

  public delete(user: User): void {
    const index = this.userDataStore.findIndex((userData) => userData.userId === user.id.value)
    this.userDataStore.splice(index, 1)
  }
}

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public exists(user: User): boolean {
    return this.userRepository.findById(user.id) !== null
  }
}

export class UserApplicationService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: UserService
  ) {}

  // ユーザー登録処理
  public register(name: string): void {
    const user = new User(new UserName(name))
    if (this.userService.exists(user)) {
      throw new Error('ユーザーが既に存在します。')
    }

    this.userRepository.save(user)
  }

  // ユーザー情報取得処理
  public get(userId: string): UserDto {
    const user = this.userRepository.findById(new UserId(userId))
    if (!user) {
      throw new Error('ユーザーが存在しません。')
    }
    return new UserDto(user)
  }
}

class Client {
  constructor(private userApplicationService: UserApplicationService) {}
}

export class UserDto {
  public id: string
  public name: string

  constructor(user: User) {
    this.id = user.id.value
    this.name = user.name.value
  }
}
