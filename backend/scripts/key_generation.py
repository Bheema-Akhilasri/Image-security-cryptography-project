import secrets

# Generate a secure random float for x0 between 0 and 1, avoiding extremes
def generate_secure_x0():
    return secrets.randbelow(9999) / 10000 + 0.0001  # e.g. 0.0001 to 0.9999

# Generate a secure random float for r within chaotic range [3.57, 4]
def generate_secure_r():
    return 3.57 + secrets.randbelow(4299) / 10000  # e.g. 3.57 to 4

x0 = generate_secure_x0()
r = generate_secure_r()

print(f'Secret key parameters: x0 = {x0}, r = {r}')
