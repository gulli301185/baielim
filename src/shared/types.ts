export type Status = 'initial' | 'success' | 'loading' | 'error';

export type UserType =
  | 'manager'
  | 'administrator'
  | 'agent'
  | 'store'
  | 'driver';

export type OrderStatus = 'new' | 'archive' | 'cancelled' | 'returned';

export type PlanStatus = 'new' | 'visited';

export interface RefreshTokenResponse {
  access: string;
}

export type Filters = {
  search?: boolean;
  agent?: boolean;
  store?: boolean;
  driver?: boolean;
  category?: boolean;
  costType?: boolean;
  region?: boolean;
  start_date?: boolean;
  end_date?: boolean;
  date?: boolean;
  sync?: string;
  day_plan?: boolean;
  author?: boolean;
  startSum?: boolean;
  endSum?: boolean;
};

export interface IUserState {
  token: ILoginRequest | null;
  user: IAdministrator | null;
  loading: boolean;
  error: null;
}

export interface IAdministrator {
  user_type: UserType | string;
  user_id: number;
}

export interface IAdmin {
  id?: number;
  name: string;
  login: string;
  password: string;
  user_type: UserType;
}

export interface IManager {
  id?: number;
  name: string;
  login: string;
  password: string;
  user_type: UserType;
}

export interface ILoginRequest {
  access: string;
  refresh: string;
}

export interface IStocks {
  id: number;
  photo?: string;
  title: string;
  description?: string;
  deadline?: string;
}

export interface IImage {
  id: number;
  image: string;
  title: string;
}

export interface IStories {
  id: number;
  photo: string;
  date?: string;
}

export interface IOrderHistory {
  id: number;
  order: IOrders;
  description?: string;
  addedItems: IItems[];
  removeItems: IItems[];
  admin: IAdmin;
  dateCreated?: string;
}

export interface IReturnedItems {
  id: number;
  item: IItem;
  quantity: number;
  soldCost: number;
}

export interface IOrderReturn {
  id: number;
  order?: number;
  returnedItems: IReturnedItems[];
  comment: string;
}

export interface IAgents {
  id: number;
  name: string;
  login: string;
  password: string;
  passport_front: string;
  passport_back: string;
  birthdate?: string;
  address?: string;
  phoneNumber?: string;
  user_type?: UserType;
  balance?: number;
  costTypes?: ICostType[];
  photo?: string;
  oneC_code?: string;
  is_active?: boolean;
}

export interface ICostType {
  id: number;
  name: string;
}

export interface IOrders {
  id: number;
  dateCreated?: string;
  store: IStores;
  agent: IAgents;
  driver: IDrivers;
  costType: ICostType;
  items: IItems[];
  totalCost: number;
  status?: OrderStatus;
  comment?: string;
  dateDelivered?: string;
  photo?: string;
  delComment?: string;
  signature?: string;
  lat?: number;
  lon?: number;
  is_sync_oneC?: boolean;
  paymentStatus?: string;
  amountLeft: number;
  weight: number;
  shipping_date?: string;
}

export interface IStores {
  id: number;
  name: string;
  login: string;
  password: string;
  contactName: string;
  photo?: string;
  phoneNumber?: string;
  phoneNumber1?: string;
  phoneNumber2?: string;
  phoneNumber3?: string;
  score?: number;
  address?: string;
  lat?: number;
  lon?: number;
  costType?: ICostType;
  user_type?: UserType;
  dateCreated: string;
  area?: number;
  documents?: string[];
  oneC_code?: string;
  store_agent?: IAgents;
  region?: IRegion;
}

export interface IDebts {
  id: number;
  sum: number;
  comment?: string;
  order: IOrders;
  store: IStores;
  dateCreated?: string;
}

export interface IDrivers {
  id: number;
  name: string;
  login: string;
  password: string;
  photo?: string;
  passport_front: string;
  passport_back: string;
  phoneNumber?: string;
  oneC_code?: string;
  balance?: number;
  user_type?: UserType;
  is_active?: boolean;
}

export interface IItems {
  id: number;
  item: IItem;
  count: number;
  soldCost: number;
  costType: ICostType;
}

export interface ICosts {
  id: number;
  cost?: number;
  costType?: ICostType;
  bonusAmount?: number;
}

export interface IItem {
  id: number;
  name: string;
  photo?: string;
  costIn: number;
  costs?: ICosts[];
  category?: ICategory;
  quantity: number;
  code?: number;
  weight: number;
  author?: string;
}

export interface IDayPlan {
  id: number;
  day?: string;
  agent: IAgents;
  status?: OrderStatus;
  stores_plan: IStoreDayPlan[];
  driver: IDrivers;
  dateCreated: string;
}

export interface IStoreDayPlan {
  id: number;
  store: IStores;
  status?: PlanStatus;
  photo?: string;
  comment?: string;
  madeOrder?: boolean;
}

export interface IParams {
  page: number;
  search: string;
  agent?: number | string | null;
  store?: number | string | null;
  start_date?: string | null;
  end_date?: string | null;
  store_agent?: number | string;
  region?: number | string;
  costType?: number | string;
  category?: number | string;
  order?: number | string;
  author?: number | string;
}

export interface ICategory {
  id: number;
  name?: string;
  nameKg?: string;
  nameEn?: string;
  icon?: string;
}

export interface IRegion {
  id: number;
  name: string;
}

export interface ITransactionOrder {
  id: number;
  sum: number;
  comment?: string;
  order: IOrders;
  dateCreated: string;
}

export interface ICount {
  itemsCount: number;
  totalCost: number;
}

export interface IStatistic {
  store__name: string;
  agent__name: string;
  date: string;
  count: number;
  total_cost: number;
}

export interface IStoreSales {
  store: IStores;
  soldCost: number;
}

export interface IStatisticItems {
  name: string;
  count: number;
  totalCost: number;
}

export interface IFAQ {
  id: number;
  question: string;
  answer: string;
  priority?: number;
}

interface IOrderSummary {
  count: number | null;
  sum: {
    totalCost__sum: number | null;
  };
}

export interface ITotalCountOfOrders {
  active_orders: IOrderSummary;
  archive_orders: IOrderSummary;
  today: IOrderSummary;
}

export interface IPieChart {
  id: string;
  value: string;
}

export interface IFilter {
  agent?: number | string;
  store?: number | string;
  driver?: number | string;
  costType?: number | string;
  start_date?: string;
  end_date?: string;
}

export interface IItemMargins {
  name: string;
  marginality: number;
}

export interface IDeletionRequest {
  id: string;
  phone: number | string;
  comment?: string;
}
