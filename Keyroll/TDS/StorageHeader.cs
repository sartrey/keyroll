using Sartrey;
using System.Xml.Linq;

namespace Keyroll.TDS
{
    public class StorageHeader
    {
        private string _Name = null;
        private string _Code = null;
        private string _Key = null;

        public string Name
        {
            get { return _Name; }
            set { _Name = value; }
        }

        private string Code
        {
            get { return _Code; }
        }

        public string Key 
        {
            get { return _Key; }
        }

        public AES AES 
        {
            get
            {
                var aes = new AES();
                aes.Key = new byte[16];
                aes.IV = new byte[16];
                return aes;
            }
        }

        public bool IsValid 
        {
            get { return !string.IsNullOrEmpty(_Key); }
        }

        public bool Activate(string key) 
        {
            if (IsValid)
                return true;
            if (string.IsNullOrEmpty(key))
                return false;
            var hash = new Sartrey.Hash();
            hash.Data = key;
            var code = hash.GetSHA1Cng();
            if (code == _Code) 
            {
                _Key = key;
                return true;
            }
            return false;
        }

        public void Deactivate() 
        {
            _Key = null;
        }

        public bool SetKey(string old, string key)
        {
            var hash = new Sartrey.Hash();
            string code = null;
            if (!string.IsNullOrEmpty(_Code))
            {
                if (string.IsNullOrEmpty(old))
                    return false;
                hash.Data = old;
                code = hash.GetSHA1Cng();
                if (code != _Code)
                    return false;
            }
            hash.Data = key;
            code = hash.GetSHA1Cng();
            _Code = code;
            _Key = key;
            return true;
        }

        public static StorageHeader Parse(XElement xml)
        {
            var header = new StorageHeader();
            header._Name = xml.Element("name").Value;
            header._Code = xml.Element("code").Value;
            return header;
        }

        public XElement ToXML()
        {
            var xml = new XElement("root",
                new XElement("name", _Name),
                new XElement("code", _Code));
            return xml;
        }
    }
}
