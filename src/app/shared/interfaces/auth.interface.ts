export interface LoginResponse {
    access_token:  string;
    refresh_token: string;
    statusCode?: number;
    message?:    string;
}

export interface RegisterResponse {
    email:    string;
    password: string;
    name:     string;
    avatar:   string;
    role:     string;
    id:       number;
}
