using System;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace ZDBACKOFFICE
{
    public static class Hash
    {
        private readonly static string salt = "JiuYingZhuanDao666";

        public static string Create(string value)
        {
            var valueBytes = KeyDerivation.Pbkdf2(
                                password: value,
                                salt: Encoding.UTF8.GetBytes(salt),
                                prf: KeyDerivationPrf.HMACSHA1,
                                iterationCount: 10000,
                                numBytesRequested: 256 / 8);
            return Convert.ToBase64String(valueBytes);
        }

        public static bool Validate(string value, string hash)
           => Create(value) == hash;
    }
}