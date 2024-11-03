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

export class MailAddress {
  private mailAddress: string

  constructor(mailAddress: string) {
    if (mailAddress.length < 3) {
      throw new Error('ユーザー名は3文字以上です。')
    }
    if (mailAddress.length > 20) {
      throw new Error('メールアドレスは20文字以下です。')
    }

    this.mailAddress = mailAddress
  }

  get value(): string {
    return this.mailAddress
  }
}

export class User {
  private readonly userId: UserId
  private userName: UserName
  private userMailAddress: MailAddress
  constructor(userName: UserName, userMailAddress: MailAddress) {
    this.userId = new UserId(Math.random().toString(36).substring(2, 10))
    this.userName = userName
    this.userMailAddress = userMailAddress
  }

  public changeName(userName: UserName): void {
    this.userName = userName
  }

  public changeMailAddress(userMailAddress: MailAddress): void {
    this.userMailAddress = userMailAddress
  }

  get id(): UserId {
    return this.userId
  }

  get name(): UserName {
    return this.userName
  }

  get mailAddress(): MailAddress {
    return this.userMailAddress
  }
}

export interface IUserRepository {
  findById(userId: UserId): User | null
  findByName(userName: UserName): User | null
  save(user: User): void
  delete(user: User): void
}

export class UserRepository implements IUserRepository {
  private readonly userDataStore: { userId: string; userName: string; userMailAddress: string }[]

  public findById(userId: UserId): User | null {
    const user = this.userDataStore.find((user) => user.userId === userId.value)
    return user
      ? new User(new UserName(user.userName), new MailAddress(user.userMailAddress))
      : null
  }

  public findByName(userName: UserName): User | null {
    const user = this.userDataStore.find((user) => user.userName === userName.value)
    return user
      ? new User(new UserName(user.userName), new MailAddress(user.userMailAddress))
      : null
  }

  public save(user: User): void {
    const index = this.userDataStore.findIndex((userData) => userData.userId === user.id.value)
    if (index === -1) {
      this.userDataStore.push({
        userId: user.id.value,
        userName: user.name.value,
        userMailAddress: user.mailAddress.value,
      })
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
  public register(name: string, mailAddress: string): void {
    const user = new User(new UserName(name), new MailAddress(mailAddress))
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

  // ユーザー更新処理
  public update(command: UserUpdateCommand): void {
    const user = this.userRepository.findById(new UserId(command.id))

    if (!user) {
      throw new Error('ユーザーが存在しません。')
    }
    user.changeName(new UserName(command.name))

    if (command.mailAddress) {
      user.changeMailAddress(new MailAddress(command.mailAddress))
    }
    this.userRepository.save(user)
  }

  // ユーザー退会処理
  public delete = (command: UserDeleteCommand): void => {
    const targetId = new UserId(command.id)
    const targetUser = this.userRepository.findById(targetId)
    if (!targetUser) {
      throw new Error('ユーザーが存在しません。')
    }
    this.userRepository.delete(targetUser)
  }
}

export class UserRegisterCommand {
  constructor(
    private userId: string,
    private userName: string,
    private userMailAddress: string
  ) {}

  get id(): string {
    return this.userId
  }

  get name(): string {
    return this.userName
  }

  get mailAddress(): string {
    return this.userMailAddress
  }
}

export class UserRegisterService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: UserService
  ) {}

  public handle = (command: UserRegisterCommand): void => {
    const user = new User(new UserName(command.name), new MailAddress(command.mailAddress))
    if (this.userService.exists(user)) {
      throw new Error('ユーザーが既に存在します。')
    }

    this.userRepository.save(user)
  }
}

export class UserDeleteService {
  constructor(private readonly userRepository: IUserRepository) {}

  public handle = (command: UserDeleteCommand): void => {
    const targetId = new UserId(command.id)
    const targetUser = this.userRepository.findById(targetId)
    if (!targetUser) {
      throw new Error('ユーザーが存在しません。')
    }
    this.userRepository.delete(targetUser)
  }
}

class Client {
  constructor(private userApplicationService: UserApplicationService) {}

  public update(userId: string, userName: string, userMailAddress?: string): void {
    const command = new UserUpdateCommand(userId, userName, userMailAddress)
    this.userApplicationService.update(command)
  }
}

export class UserDto {
  public id: string
  public name: string

  constructor(user: User) {
    this.id = user.id.value
    this.name = user.name.value
  }
}

export class UserUpdateCommand {
  private userId: string
  private userName: string
  private userMailAddress?: string

  constructor(userId: string, userName: string, userMailAddress?: string) {
    this.userId = userId
    this.userName = userName
    this.userMailAddress = userMailAddress
  }

  get id(): string {
    return this.userId
  }

  get name(): string {
    return this.userName
  }

  get mailAddress(): string | undefined {
    return this.userMailAddress
  }
}

export class UserDeleteCommand {
  constructor(
    private userId: string,
    private userName: string,
    private userMailAddress: string
  ) {}

  get id(): string {
    return this.userId
  }

  get name(): string {
    return this.userName
  }

  get mailAddress(): string {
    return this.userMailAddress
  }
}
