using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Packaging;
using System.Net.Mime;
using System.Xml.Linq;

namespace Keyroll.TDS
{
    public class Storage
    {
        private string _Path;
        private Package _Data;
        private List<Asset> _Assets;

        private string _Name;
        private string _Code;
        private string _Key;

        public string Path 
        {
            get { return _Path; }
            set { _Path = value; }
        }

        public string Name 
        {
            get { return _Name; }
            set { _Name = value; }
        }

        public string Key 
        {
            get { return _Key; }
            set { _Key = value; }
        }

        public Asset this[string id]
        {
            get 
            {
                foreach (var asset in _Assets)
                    if (asset.Id == id)
                        return asset;
                return null;
            }
        }

        protected Storage() { }

        public static Storage Load(string path)
        {
            var storage = new Storage();
            storage._Path = path;
            storage._Data = Package.Open(path, FileMode.Open, FileAccess.ReadWrite, FileShare.None);
            
            var xml = XElement.Load(storage.OpenPart("global.xml"));
            var xml_root = xml.Element("root");
            storage._Name = xml_root.Element("name").Value;
            storage._Code = xml_root.Element("code").Value;

            storage._Assets = new List<Asset>();
            xml = XElement.Load(storage.OpenPart("assets.xml"));
            xml_root = xml.Element("root");
            foreach(var xml_asset in xml_root.Elements("asset"))
            {
                var asset = Asset.Parse(xml_asset);
                storage._Assets.Add(asset);
            }
            return storage;
        }

        public static Storage Create(string path)
        {
            var storage = new Storage();
            storage._Path = path;
            storage._Assets = new List<Asset>();
            storage._Data = Package.Open(path, FileMode.Create, FileAccess.ReadWrite, FileShare.None);
            return storage;
        }

        public void Close()
        {
            var uri = PackUriHelper.CreatePartUri(
                new Uri("global.xml", UriKind.Relative));
            var part = _Data.PartExists(uri) ?
                _Data.GetPart(uri) :
                _Data.CreatePart(uri, MediaTypeNames.Text.Xml);
            var xml = new XElement("root",
                new XElement("name", _Name),
                new XElement("code", _Code));
            xml.Save(part.GetStream());

            uri = PackUriHelper.CreatePartUri(
                new Uri("assets.xml", UriKind.Relative));
            part = _Data.PartExists(uri) ?
                _Data.GetPart(uri) :
                _Data.CreatePart(uri, MediaTypeNames.Text.Xml);
            xml = new XElement("root");
            foreach(var asset in _Assets)
                xml.Add(asset.ToXML());
            xml.Save(part.GetStream());
            _Data.Close();
        }

        public bool Authorize(string key) 
        {
            var hasher = new Sartrey.Hash();
            hasher.Data = key;
            var hash = hasher.GetSHA1Cng();
            if (_Code == hash)
            {
                _Key = key;
                return true;
            }
            return false;
        }

        /// <summary>
        /// copy data from one stream to another
        /// </summary>
        private void CopyStream(Stream source, Stream target)
        {
            const int buffer_size = 0x1000; //1000(16) = 4096(10) 4KB
            byte[] buffer = new byte[buffer_size];
            int count = 0;
            while ((count = source.Read(buffer, 0, buffer_size)) > 0)
                target.Write(buffer, 0, count);
        }

        public Stream OpenPart(string id)
        {
            var uri = PackUriHelper.CreatePartUri(
                new Uri(id, UriKind.Relative));
            var part = _Data.GetPart(uri);
            return part.GetStream();
        }

        public void AddPart(string path, string id, string type)
        {
            var uri = PackUriHelper.CreatePartUri(
                new Uri(id, UriKind.Relative));
            var part = _Data.CreatePart(uri, type);
            var stream = new FileStream(path, FileMode.Open, FileAccess.Read);
            CopyStream(stream, part.GetStream());
            stream.Close();
        }

        public void RemovePart(string id)
        {
            var uri = PackUriHelper.CreatePartUri(new Uri(id, UriKind.Relative));
            _Data.DeletePart(uri);
        }

        public void ExportPart(string path, string id, bool overwrite = false)
        {
            var uri = PackUriHelper.CreatePartUri(new Uri(id, UriKind.Relative));
            var part = _Data.GetPart(uri);
            var stream = new FileStream(path, overwrite ? FileMode.OpenOrCreate : FileMode.Create, FileAccess.Write);
            CopyStream(part.GetStream(), stream);
            stream.Flush();
            stream.Close();
        }
    }
}