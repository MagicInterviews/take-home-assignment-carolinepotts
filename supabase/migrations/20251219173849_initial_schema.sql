-- Create the organizations table
CREATE TABLE organizations (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
);

-- Create the admins table
CREATE TABLE admins (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id),
    organization_id uuid NOT NULL REFERENCES organizations(id),
    name text NOT NULL,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
);

-- Create the teachers table
CREATE TABLE teachers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id),
    organization_id uuid NOT NULL REFERENCES organizations(id),
    name text NOT NULL,
    active boolean DEFAULT true,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
);

-- Create the tools table
CREATE TABLE tools (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    description text,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
);

-- Create the teacher tools assignments table
CREATE TABLE teacher_tools (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id uuid NOT NULL REFERENCES teachers(id),
    tool_id uuid NOT NULL REFERENCES tools(id),
    disabled boolean DEFAULT false,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    UNIQUE (teacher_id, tool_id)
);
